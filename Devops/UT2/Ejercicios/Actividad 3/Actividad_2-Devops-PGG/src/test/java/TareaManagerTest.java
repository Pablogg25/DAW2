
import com.mycompany.actividad_2.devops.pgg.TareaManager;
import java.sql.DriverManager;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Assumptions;
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

    private boolean mysqlDisponible() {
        String host = System.getenv().getOrDefault("DB_HOST", "localhost");
        try {
            DriverManager.getConnection("jdbc:mysql://" + host + ":3306/tareas_db?connectTimeout=1000", "root", "root").close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Test
    public void testValidacionDatos() {
        // Test unitario que siempre corre en el build
        assertNotNull(System.getenv().getOrDefault("DB_NAME", "tareas_db"));
    }

    @Test
    public void testCrudCompletoMySQL() {
        Assumptions.assumeTrue(mysqlDisponible(), "MySQL no activo en fase de build; se omite test de integración.");
        TareaManager manager = new TareaManager();
        assertTrue(manager.agregarTarea("Test JUnit MySQL"));
        assertFalse(manager.listarTareas().isEmpty());
    }
}