/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Models;

/**
 *
 * @author daw2
 */
public class Tarea {

    private String nombre;
    private String descripcion;
    private Boolean completado;

    public Tarea(String nombre, String descripcion, Boolean completado) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.completado = completado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Boolean getCompletado() {
        return completado;
    }

    public void setCompletado(Boolean completado) {
        this.completado = completado;
    }

    @Override
    public String toString() {
        return "Tarea{" + "nombre=" + nombre + ", descripcion=" + descripcion + ", completado=" + completado + '}';
    }
}
