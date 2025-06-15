# Prueba de Concepto: Plataforma RWA (ERC-20)

Este proyecto es una prueba de concepto de una plataforma para Real World Assets (RWA) basada en un contrato ERC-20, integrando un frontend en React/Vite y un backend de contratos inteligentes con Hardhat y Solidity.

## ¿Qué incluye?
- Contrato ERC-20 para representar activos tokenizados (RWAAsset.sol).
- Scripts para desplegar y testear el contrato en una red local con Hardhat.
- Frontend en React para consultar información del token y la cuenta conectada.
- Integración con MetaMask para simular la experiencia de usuario real.

---

## ¿Cómo ejecutarlo?

### 1. Instalar dependencias
```bash
npm install
```

### 2. Compilar y desplegar el contrato en Hardhat
Abre dos terminales en la raíz del proyecto:

- **Terminal 1:** Inicia el nodo local de Hardhat
  ```bash
  npm run node
  ```
- **Terminal 2:** Despliega el contrato
  ```bash
  npm run deploy
  ```
  Copia la dirección que aparece tras `RWAAsset deployed to:`

### 3. Configura MetaMask

Metamask es una extensión del navegador, aquí se ingresa las cuentas de nuestra red. Esta misma extensión se encarga de conectarse a la página para pasar la información de la cuenta registrada.

- Agrega la red local:
  - RPC URL: `http://127.0.0.1:8545`
  - Chain ID: `31337`
- Importa una de las cuentas privadas que muestra Hardhat al iniciar el nodo.

### 4. Ejecuta el frontend
```bash
npm run dev
```
Abre la app en tu navegador (por defecto: http://localhost:5173).

---

## Manual de usuario: Consulta de tokens

1. **Conecta MetaMask** a la red local y selecciona una cuenta importada.
2. **Ingresa la dirección del contrato** desplegado en el campo correspondiente.
3. El sistema mostrará:
   - Dirección de tu cuenta
   - Nombre y símbolo del token
   - Total de tokens emitidos
   - Balance de tu cuenta
4. Puedes actualizar la información con el botón "Actualizar".

> **Nota:** Solo la cuenta que desplegó el contrato tiene tokens al inicio. Si el balance es 0 es por este motivo.
>
>En mi caso tuve que ingresar en metamask la cuenta numero 0 (de las creadas al iniciar el nodo local)
>
>Ademas, aunque en metamask pueden aparecer tokens en las cuentas, no son los mismos tokens que se crean con el contrato. los tokens del RWA de prueba que estamos creado se generan al desplegar el contrato y solo se le dan a la cuenta #0!!

---

## Estructura principal del proyecto
- `contracts/` — Contratos Solidity (ERC-20)
- `scripts/` — Scripts de despliegue
- `src/` — Frontend React y lógica de conexión blockchain
- `hardhat.config.js` — Configuración de Hardhat

---

## Requisitos
- Node.js >= 18
- MetaMask (extensión de navegador)
