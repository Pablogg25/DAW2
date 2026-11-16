package com.mycompany.actividad_2.devops.pgg;

import java.util.ArrayList;
import java.util.List;

public class TareaManager {
    private List<String> tareas;

    public TareaManager() {
        this.tareas = new ArrayList<>();
        // Elementos precargados obligatorios según enunciado
        this.tareas.add("Configurar entorno Linux Mint");
        this.tareas.add("Instalar Docker Engine");
        this.tareas.add("Crear Dockerfile multi-etapa");
    }

    // Read (Consultar)
    public List<String> listarTareas() {
        return new ArrayList<>(tareas);
    }

    // Create (Añadir)
    public boolean agregarTarea(String tarea) {
        if (tarea == null || tarea.trim().isEmpty()) {
            return false;
        }
        return tareas.add(tarea.trim());
    }

    // Update (Actualizar - para cubrir CRUD completo en los tests)
    public boolean actualizarTarea(int indice, String nuevaDescripcion) {
        if (indice < 0 || indice >= tareas.size() || nuevaDescripcion == null || nuevaDescripcion.trim().isEmpty()) {
            return false;
        }
        tareas.set(indice, nuevaDescripcion.trim());
        return true;
    }

    // Delete (Borrar)
    public boolean eliminarTarea(int indice) {
        if (indice < 0 || indice >= tareas.size()) {
            return false;
        }
        tareas.remove(indice);
        return true;
    }
}