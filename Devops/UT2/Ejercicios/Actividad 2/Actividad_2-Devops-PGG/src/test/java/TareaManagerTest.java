
import com.mycompany.actividad_2.devops.pgg.TareaManager;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author daw221@iesmhp.local
 */
public class TareaManagerTest {
    private TareaManager manager;

    @BeforeEach
    public void setUp() {
        manager = new TareaManager();
    }

    @Test
    public void testConsultarElementosPrecargados() {
        List<String> tareas = manager.listarTareas();
        assertEquals(3, tareas.size(), "Debe haber 3 tareas precargadas inicialmente");
        assertTrue(tareas.contains("Instalar Docker Engine"));
    }

    @Test
    public void testAgregarElemento() {
        boolean resultado = manager.agregarTarea("Subir entrega a Moodle");
        assertTrue(resultado);
        assertEquals(4, manager.listarTareas().size());
        assertEquals("Subir entrega a Moodle", manager.listarTareas().get(3));
        
        // Probar caso inválido
        assertFalse(manager.agregarTarea("   "));
    }

    @Test
    public void testActualizarElemento() {
        boolean actualizado = manager.actualizarTarea(0, "Configurar Linux Mint 22");
        assertTrue(actualizado);
        assertEquals("Configurar Linux Mint 22", manager.listarTareas().get(0));
        
        // Probar índice fuera de rango
        assertFalse(manager.actualizarTarea(99, "No existe"));
    }

    @Test
    public void testEliminarElemento() {
        boolean eliminado = manager.eliminarTarea(1);
        assertTrue(eliminado);
        assertEquals(2, manager.listarTareas().size());
        assertFalse(manager.listarTareas().contains("Instalar Docker Engine"));
        
        // Probar índice inválido
        assertFalse(manager.eliminarTarea(-1));
    }
}
