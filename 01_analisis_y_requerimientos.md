# Caso 3: Página web informativa para un negocio local
**Negocio:** StarCafé | Cafetería · Villa Rica, Oxapampa, Pasco

## 1. Público objetivo
- **Turistas y visitantes** (25–55 años) que buscan un recuerdo auténtico de Villa Rica.
- **Compradores en otras ciudades** (Lima, Huancayo, Tarma) que quieren café directo del productor.
- **Cafeterías y tiendas** pequeñas que compran por mayor.
- **Vecinos de Villa Rica** que piden por WhatsApp.
Todos usan principalmente el **celular**.

## 2. Necesidades de los usuarios
| Usuario | Necesita |
|---|---|
| Turista | Ver productos, precios y dónde está la tienda |
| Comprador a distancia | Pedir fácil y saber si hay envíos |
| Cafetería | Contacto directo y confianza en el origen |
| Vecino | Horario y WhatsApp rápido |

*(Para validarlo: pregunta a 5 clientes reales qué buscan al visitar la página.)*

## 3. Lista de requerimientos
**Funcionales**
- RF1. Páginas independientes: Inicio, Productos, Nosotros y Contáctanos.
- RF2. Navegación compartida entre páginas, adaptable a celular.
- RF3. Catálogo con búsqueda y filtros por cafés, frapés y bebidas heladas, desayunos típicos, desayunos especiales y especiales para picar.
- RF4. Carrito que permite agregar, cambiar cantidades, eliminar y enviar el pedido por WhatsApp.
- RF5. Formulario de contacto para consultas, pedidos y propuestas de proveedores que prepara un mensaje para WhatsApp.
- RF6. Mostrar información de ubicación y contacto, verificando los datos reales antes de publicar.
- RF7. Pie de página compartido con dirección, horarios, correo, teléfono, artículo reciente, créditos e iconos de Facebook, Instagram, YouTube y TikTok.

**No funcionales**
- RNF1. Diseño adaptable (responsive), pensado primero para celular.
- RNF2. Textos de 16 px o más, con buen contraste.
- RNF3. Botones táctiles de al menos 44 px.
- RNF4. Imágenes ligeras para cargar rápido con datos móviles.

## 4. Estructura (mapa del sitio)
- `index.html`: presentación, categorías y acceso al menú.
- `productos.html`: búsqueda, filtros y carrito de compras.
- `nosotros.html`: historia e identidad de la marca.
- `contacto.html`: consultas, pedidos y contacto para proveedores.
- El menú muestra precios por confirmar hasta que se ingresen los precios reales; las tarjetas tienen espacios para las fotos de los productos.

## 5. Guía para el prototipo en Figma
1. Crea dos Frames: **Mobile 375×812** y **Desktop 1440×900**.
2. Colores: Verde #1F3D2B · Verde 2 #2F5D3F · Café #4A2C1A · Cereza #B8352E · Fondo #F3F5EE.
3. Tipografías: Fraunces (títulos) y Nunito Sans (texto). Títulos 32–40 px, texto 16–17 px.
4. Usa Auto Layout: Header → Hero → Productos → Nosotros → Contacto → Footer.
5. Arrastra los `.svg` de la carpeta `img/` a Figma.
6. Crea un componente "Botón" (primario cereza, secundario con borde) y uno "Tarjeta de producto".
7. En Prototype, une los enlaces del menú a cada sección.
8. Prueba en Preview o en la app Figma Mirror del celular.

## 7. Antes de publicar
- Reemplaza el número de ejemplo `51900000000` en `js/app.js` y en los enlaces de WhatsApp.
- Confirma precios, disponibilidad, correo y cualquier dirección u horario del negocio.

## 6. Verificación móvil
- [ ] Se lee sin hacer zoom
- [ ] El menú se abre con un toque
- [ ] No hay scroll horizontal
- [ ] Botones fáciles de tocar con el pulgar
- [ ] El botón de WhatsApp siempre visible
