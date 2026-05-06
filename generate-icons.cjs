#!/usr/bin/env node
// Script para generar íconos SVG simples para la PWA
const fs = require('fs')
const path = require('path')

function generarSVG(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#2d6a4f"/>
  <text x="50%" y="55%" font-size="${size * 0.55}" text-anchor="middle" dominant-baseline="middle" font-family="serif">🌿</text>
</svg>`
}

const outDir = path.join(__dirname, 'public', 'icons')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

fs.writeFileSync(path.join(outDir, 'icon-192.svg'), generarSVG(192))
fs.writeFileSync(path.join(outDir, 'icon-512.svg'), generarSVG(512))
console.log('SVG icons generated')
