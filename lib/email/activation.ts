const PLAN_LABELS: Record<string, { label: string; volume: number; prix: number }> = {
  starter:    { label: "Starter",    volume: 20, prix: 95 },
  booster:    { label: "Booster",    volume: 30, prix: 85 },
  croissance: { label: "Croissance", volume: 40, prix: 75 },
};

export function buildActivationEmail(params: {
  prenom: string;
  nom: string;
  nomEntreprise: string;
  selectedPlan: string;
  hubUrl: string;
}) {
  const { prenom, nom, nomEntreprise, selectedPlan, hubUrl } = params;
  const plan = PLAN_LABELS[selectedPlan] ?? PLAN_LABELS.starter;

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Votre compte Paragon IA est activé</title>
</head>
<body style="margin:0;padding:0;background:#F4F6F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6F9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:24px;">
              <a href="https://paragon-ia.com" style="text-decoration:none;display:inline-block;">
                <img src="https://paragon-ia.tech/logo-paragon.png" alt="Paragon IA" width="140" height="36" style="display:block;width:140px;height:36px;object-fit:contain;" />
              </a>
            </td>
          </tr>

          <!-- Hero card -->
          <tr>
            <td style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

              <!-- Gold top bar -->
              <table width="100%" cellpadding="0" cellspacing="0"><tr><td style="height:4px;background:linear-gradient(90deg,#C2984C,#D9B770,#C2984C);font-size:0;">&nbsp;</td></tr></table>

              <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 28px 28px;">
                <!-- Green check -->
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <table cellpadding="0" cellspacing="0" style="box-shadow:0 10px 28px rgba(22,163,74,0.28);">
                      <tr>
                        <td width="68" height="68" align="center" valign="middle" style="width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg,#16A34A,#15803D);text-align:center;vertical-align:middle;">
                          <span style="font-size:30px;line-height:68px;color:#ffffff;font-weight:900;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">✓</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Titre -->
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#16A34A;">✓ ACTIVATION CONFIRMÉE</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <h1 style="margin:0;font-size:28px;font-weight:900;color:#0B1320;letter-spacing:-0.8px;line-height:1.2;">
                      Bienvenue chez Paragon,<br />${prenom}&nbsp;!
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <p style="margin:0;font-size:15px;color:#4A5468;line-height:1.65;max-width:440px;">
                      Votre contrat est signé et votre compte est activé. Vos premières <strong style="color:#0B1320;">demandes de rendez-vous qualifiés</strong> arrivent dans les <strong style="color:#0B1320;">24 à 48 heures</strong>.
                    </p>
                  </td>
                </tr>

                <!-- CTA -->
                <tr>
                  <td align="center" style="padding-bottom:32px;">
                    <a href="${hubUrl}" style="display:inline-block;background:linear-gradient(180deg,#16A34A,#15803D);color:#fff;text-decoration:none;font-size:16px;font-weight:700;padding:16px 36px;border-radius:50px;letter-spacing:-0.2px;box-shadow:0 10px 24px rgba(22,163,74,0.32);">
                      Accéder à ma plateforme →
                    </a>
                    <p style="margin:10px 0 0;font-size:12px;color:#9CA3AF;">Cliquez pour accéder à votre espace membre Paragon IA</p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr><td style="border-top:1px solid #F0F2F5;padding-bottom:24px;"></td></tr>

                <!-- Pack info -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <p style="margin:0 0 12px;font-size:10.5px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#A8852D;">Votre pack souscrit</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDFAF2;border:1px solid rgba(194,152,76,0.2);border-radius:14px;padding:18px 20px;">
                      <tr>
                        <td>
                          <p style="margin:0;font-size:18px;font-weight:900;color:#0B1320;letter-spacing:-0.4px;">${plan.label} — ${plan.volume} demandes qualifiées</p>
                          <p style="margin:4px 0 0;font-size:12.5px;color:#6B7280;font-weight:600;">Zone exclusive · ${plan.prix} € TTC / demande livrée · Prélevé à la livraison</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- 3 next steps -->
                <tr>
                  <td style="padding-bottom:8px;">
                    <p style="margin:0 0 14px;font-size:10.5px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#A8852D;">Ce qui se passe maintenant</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:top;padding:0 0 12px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:28px;height:28px;border-radius:8px;background:#DCFCE7;text-align:center;vertical-align:middle;font-size:13px;font-weight:900;color:#15803D;flex-shrink:0;">✓</td>
                              <td style="padding-left:12px;">
                                <p style="margin:0;font-size:13.5px;font-weight:700;color:#0B1320;">Contrat signé · PDF joint</p>
                                <p style="margin:2px 0 0;font-size:12px;color:#6B7280;">Votre contrat signé est disponible en pièce jointe.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="vertical-align:top;padding:0 0 12px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:28px;height:28px;border-radius:8px;background:#FAEDD6;text-align:center;vertical-align:middle;font-size:11px;font-weight:900;color:#A8852D;">02</td>
                              <td style="padding-left:12px;">
                                <p style="margin:0;font-size:13.5px;font-weight:700;color:#0B1320;">Dans l'heure — votre agent dédié</p>
                                <p style="margin:2px 0 0;font-size:12px;color:#6B7280;">Marie Claire vous contacte pour valider votre ciblage exact.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="vertical-align:top;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:28px;height:28px;border-radius:8px;background:#FAEDD6;text-align:center;vertical-align:middle;font-size:11px;font-weight:900;color:#A8852D;">03</td>
                              <td style="padding-left:12px;">
                                <p style="margin:0;font-size:13.5px;font-weight:700;color:#0B1320;">Sous 24-48h — premières demandes</p>
                                <p style="margin:2px 0 0;font-size:12px;color:#6B7280;">Notifications email à chaque nouvelle demande livrée.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Footer card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-top:1px solid #F0F2F5;padding:20px 28px;">
                <tr>
                  <td>
                    <p style="margin:0;font-size:12px;color:#6B7280;line-height:1.6;">
                      Une question ? Contactez-nous à
                      <a href="mailto:serviceclient@paragon-ia.com" style="color:#0B1320;font-weight:600;text-decoration:none;">serviceclient@paragon-ia.com</a>
                      — votre agent Marie Claire répond sous 1h.
                    </p>
                    <p style="margin:8px 0 0;font-size:11px;color:#9CA3AF;">
                      © 2026 Paragon IA · Paragon Intelligence LLC · 30 N Gould St, STE R, Sheridan, WY 82801, USA
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Bienvenue chez Paragon, ${prenom} !

Votre contrat est signé et votre compte est activé.
Vos premières demandes de rendez-vous qualifiés arrivent dans les 24 à 48 heures.

Accédez à votre plateforme : ${hubUrl}

Pack souscrit : ${plan.label} — ${plan.volume} demandes · ${plan.prix} € TTC / demande livrée

Ce qui se passe maintenant :
1. Contrat signé — PDF joint à cet email
2. Dans l'heure — Marie Claire vous contacte pour valider votre ciblage
3. Sous 24-48h — premières demandes livrées

Questions : serviceclient@paragon-ia.com

© 2026 Paragon IA`;

  return {
    subject: `Félicitations, votre compte Paragon IA est activé, ${prenom}`,
    html,
    text,
  };
}
