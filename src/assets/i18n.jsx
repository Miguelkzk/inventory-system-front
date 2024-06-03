// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones de ejemplo
const resources = {
  es: {
    translation: {
      "Articles": "Artículos",
      "Suppliers": 'Proveedores',
      "code": "código",
      "name": "nombre",
      "view all": "ver todo",
      "New article": "Nuevo artículo",
      "Description": "descripción",
      'estimated_demand': "demanda estimada",
      'inventory_model':'modelo de inventario',
      'requested point': 'punto de reposición',
      'security stock': 'stock de seguridad',
      'Cost': 'costo',
      'Current stock':'stock actual',
      'article': 'artículo',
      'edit':'editar',
      'back':'volver',
      'delete article':'borrar artículo',
      'edit article': 'editar artículo ',
      'purchase_cost': 'costo de compra',
      'storage_cost': 'costo de almacenamiento',
      'order_cost':'costo de orden',
      'fixed_lot': 'lote fijo',
      'fixed_interval': 'intervalo fijo'
    }
  }
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Pasar i18n a react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Idioma de respaldo
    interpolation: {
      escapeValue: false // React ya se encarga de la protección contra XSS
    }
  });

export default i18n;
