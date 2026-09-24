import Models.Tarea;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class TareaTest {

    @Test
    public void testCrearTarea() {
        Tarea t = new Tarea("Estudiar", "Repasar Java", false);

        assertEquals("Estudiar", t.getNombre());
        assertEquals("Repasar Java", t.getDescripcion());
        assertFalse(t.getCompletado());
    }

    @Test
    public void testSetters() {
        Tarea t = new Tarea("A", "B", false);

        t.setNombre("Nuevo nombre");
        t.setDescripcion("Nueva descripción");
        t.setCompletado(true);

        assertEquals("Nuevo nombre", t.getNombre());
        assertEquals("Nueva descripción", t.getDescripcion());
        assertTrue(t.getCompletado());
    }

    @Test
    public void testToString() {
        Tarea t = new Tarea("Tarea1", "Desc1", false);

        String texto = t.toString();

        assertTrue(texto.contains("Tarea1"));
        assertTrue(texto.contains("Desc1"));
        assertTrue(texto.contains("false"));
    }
}
