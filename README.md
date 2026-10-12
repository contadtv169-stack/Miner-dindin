# Miner Dindin (Expo)

Aplicativo Android para acompanhar saldos informados de pools de mineração. **Este app não minera no celular**; apenas consulta APIs quando disponíveis.

## Testar com Expo Go
1. Instale Node.js 20+ no computador.
2. Execute `npm install`.
3. Execute `npx expo start` e leia o QR code com Expo Go.

## APK
O workflow em Actions pode gerar um APK com EAS. Configure o segredo `EXPO_TOKEN` em Settings → Secrets and variables → Actions e execute o workflow `Build Miner Dindin APK`. É necessário ter uma conta/projeto EAS configurado.

Não informe senhas nem frases-semente de carteiras.