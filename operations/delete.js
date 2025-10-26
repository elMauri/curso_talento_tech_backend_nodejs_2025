// operations/delete.js
// Operaciones DELETE para eliminar un producto

// Constante para la URL base de la API
const FAKESTORE_API_BASE = 'https://fakestoreapi.com';

// Función para eliminar un producto por ID
export async function deleteProductById(id) {
    console.log(`  Eliminando producto con ID: ${id}...\n`);
    
    try {
        await fetch(`${FAKESTORE_API_BASE}/products/${id}`, {
            method: 'DELETE'
        }).then(response => {
          return response.json();
        }).then(result => {
          // Se muestra información de confirmación usando destructuracion
          // console.log(` Producto eliminado exitosamente:`);
          // console.log(`  ID eliminado: ${id}`);
          console.log(`  Titulo : ${result.title}`);
          console.log(`  Descripción : ${result.description}`)})
        .catch(error => {
          if (response.status === 404) {
                throw new Error(`Producto con ID ${id} no encontrado`);
          }
            console.error('Error eliminando producto:', error.message);
        });
    } catch (error) {
        console.error('Error en la operación DELETE:', error.message);
    }
}