## Context

L'étape 6 finalise le tunnel d'onboarding. Le client a déjà enregistré sa CB (étape 5). Il doit maintenant signer le contrat d'activation qui l'engage sur le pack choisi. La signature électronique est gérée par une instance DocuSeal self-hosted (`docuseal.paragon-ia.tech`). DocuSeal génère le PDF signé, horodaté, et l'envoie par email via n8n.

## Goals / Non-Goals

**Goals:**
- Afficher le contrat pré-rempli avec les données du client (société, dirigeant, email, téléphone, plan)
- Permettre la signature électronique via le widget DocuSeal embarqué (`@docuseal/react`)
- Appeler l'API DocuSeal server-side (Route Handler) pour créer une soumission avec les données pré-remplies
- Retourner le `slug` de signature au client pour l'embed
- Déclencher n8n via webhook après signature (envoi PDF)
- Rediriger vers `/onboarding/confirmation` après signature

**Non-Goals:**
- Gestion de l'authentification DocuSeal (template déjà configuré dans l'interface DocuSeal)
- Création du template de contrat (fait manuellement dans DocuSeal avant déploiement)
- Re-génération du contrat en cas de modification des données

## Decisions

### 1. Signature via widget DocuSeal embarqué
**Décision** : Installer `@docuseal/react` et utiliser `<DocusealForm>` en mode embed dans la page.
**Pourquoi** : L'embed est nativement responsive, gère le canvas de signature (souris/doigt), l'horodatage légal, et génère le PDF automatiquement. Aucun re-développement de logique de signature.
**Alternative écartée** : Canvas HTML5 custom + appel API DocuSeal direct → maintenance lourde, risque légal.

### 2. Création de la soumission DocuSeal côté serveur
**Décision** : `POST /api/contrat/signer` → appelle `POST {DOCUSEAL_API_URL}/api/submissions` avec les données du client → retourne `{ slug }`.
**Pourquoi** : La clé API DocuSeal ne doit jamais être exposée côté client. Le Route Handler lit les données depuis le body JSON, appelle DocuSeal, et retourne uniquement le `slug` pour l'embed.

### 3. Données pré-remplies via prefilled_fields DocuSeal
DocuSeal accepte des `prefilled_fields` lors de la création d'une soumission. Le front envoie `{ compte, selectedPlan }` au Route Handler qui mappe vers les champs du template DocuSeal.

### 4. Récapitulatif pack calculé client-side
Les plans ont des valeurs fixes :
- Starter : 20 RDV × 85 €/RDV = 1 700 € TTC
- Booster : 30 RDV × 85 €/RDV = 2 550 € TTC  
- Croissance : 40 RDV × 75 €/RDV = 3 000 € TTC

Ces valeurs sont hardcodées dans le composant (pas d'API).

### 5. Webhook n8n post-signature
DocuSeal envoie un webhook quand la signature est complète. Ce webhook est configuré dans DocuSeal vers l'URL n8n. Le front n'a pas besoin de gérer cette logique.
La redirection vers `/onboarding/confirmation` est gérée via la prop `onComplete` du `<DocusealForm>`.

## Risks / Trade-offs

- **Template DocuSeal non configuré** → Afficher un message d'erreur clair si `DOCUSEAL_TEMPLATE_ID` est vide. Mitigation : vérification au chargement de la page.
- **DocuSeal self-hosted down** → Le Route Handler retourne une erreur 503, la page affiche "Service indisponible, contactez le support". Mitigation : timeout 10s sur le fetch.
- **Données manquantes dans le store** (si le client accède directement à `/onboarding/contrat`) → Redirection vers `/onboarding/ciblage`. Mitigation : guard sur `compte.email` vide.
