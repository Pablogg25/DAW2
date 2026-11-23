package com.mycompany.actividad_2.devops.pgg;

import java.sql.*;;
import java.util.ArrayList;
import java.util.List;


public class TareaManager {
    private final String url;
    private final String user;
    private final String password;

    public TareaManager() {
        String host = System.getenv().getOrDefault("DB_HOST", "localhost");
        String dbName = System.getenv().getOrDefault("DB_NAME", "tareas_db");
        this.user = System.getenv().getOrDefault("DB_USER", "root");
        this.password = System.getenv().getOrDefault("DB_PASS", "root");
        this.url = "jdbc:mysql://" + host + ":3306/" + dbName + "?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC";

        inicializarBaseDeDatos();
    }

    private Connection conectar() throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    private void inicializarBaseDeDatos() {
        // Reintento por si MySQL aún está arrancando dentro del contenedor
        for (int i = 0; i < 10; i++) {
            try (Connection conn = conectar(); Statement stmt = conn.createStatement()) {
                stmt.execute("CREATE TABLE IF NOT EXISTS tareas (id INT AUTO_INCREMENT PRIMARY KEY, descripcion VARCHAR(255) NOT NULL)");

                ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM tareas");
                if (rs.next() && rs.getInt(1) == 0) {
                    stmt.executeUpdate("INSERT INTO tareas (descripcion) VALUES ('Configurar entorno Linux Mint'), ('Instalar Docker Compose'), ('Desplegar Java con MySQL')");
                }
                return;
            } catch (SQLException e) {
                System.out.println("Esperando a que MySQL esté listo... (" + (i + 1) + "/10)");
                try { Thread.sleep(3000); } catch (InterruptedException ignored) {}
            }
        }
    }

    public List<String> listarTareas() {
        List<String> lista = new ArrayList<>();
        String sql = "SELECT id, descripcion FROM tareas ORDER BY id ASC";
        try (Connection conn = conectar(); Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                lista.add("[ID: " + rs.getInt("id") + "] " + rs.getString("descripcion"));
            }
        } catch (SQLException e) {
            System.out.println("Error al listar: " + e.getMessage());
        }
        return lista;
    }

    public boolean agregarTarea(String descripcion) {
        if (descripcion == null || descripcion.trim().isEmpty()) return false;
        String sql = "INSERT INTO tareas (descripcion) VALUES (?)";
        try (Connection conn = conectar(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, descripcion.trim());
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.out.println("Error al añadir: " + e.getMessage());
            return false;
        }
    }

    public boolean actualizarTarea(int id, String nuevaDescripcion) {
        if (nuevaDescripcion == null || nuevaDescripcion.trim().isEmpty()) return false;
        String sql = "UPDATE tareas SET descripcion = ? WHERE id = ?";
        try (Connection conn = conectar(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, nuevaDescripcion.trim());
            pstmt.setInt(2, id);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.out.println("Error al actualizar: " + e.getMessage());
            return false;
        }
    }

    public boolean eliminarTarea(int id) {
        String sql = "DELETE FROM tareas WHERE id = ?";
        try (Connection conn = conectar(); PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            System.out.println("Error al borrar: " + e.getMessage());
            return false;
        }
    }
}