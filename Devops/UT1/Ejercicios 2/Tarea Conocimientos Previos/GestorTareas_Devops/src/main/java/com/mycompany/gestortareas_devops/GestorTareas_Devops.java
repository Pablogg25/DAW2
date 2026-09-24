/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.gestortareas_devops;

import Models.Tarea;
import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author daw2
 */
public class GestorTareas_Devops {

    private static ArrayList<Tarea> tareas = new ArrayList<>();
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("Bienvenido al gestor de Tareas");;

        int opcion;
        do {
            System.out.println("\n=== GESTOR DE TAREAS ===");
            System.out.println("1. Añadir tarea");
            System.out.println("2. Listar tareas");
            System.out.println("3. Marcar tarea como completada");
            System.out.println("4. Eliminar tarea");
            System.out.println("5. Salir");
            System.out.print("Opción: ");

            opcion = Integer.parseInt(sc.nextLine());

            switch (opcion) {
                case 1:
                    agregarTarea();
                    break;
                case 2:
                    listarTareas();
                    break;
                case 3:
                    completarTarea();
                    break;
                case 4:
                    eliminarTarea();
                    break;
                case 5:
                    System.out.println("Saliendo...");
                    break;
                default:
                    System.out.println("Opción no válida.");
            }

        } while (opcion != 5);
    }

    private static void agregarTarea() {
        System.out.print("Nombre de la tarea: ");
        String nombre = sc.nextLine();

        System.out.print("Descripción: ");
        String descripcion = sc.nextLine();

        Tarea t = new Tarea(nombre, descripcion, false);
        tareas.add(t);

        System.out.println("Tarea añadida correctamente.");
    }

    private static void listarTareas() {
        if (tareas.isEmpty()) {
            System.out.println("No hay tareas.");
            return;
        }

        System.out.println("\n--- LISTA DE TAREAS ---");
        for (int i = 0; i < tareas.size(); i++) {
            Tarea t = tareas.get(i);
            System.out.println(i + ". " + t.getNombre() + " | " + t.getDescripcion()
                    + " | Completada: " + (t.getCompletado() ? "Sí" : "No"));
        }
    }

    private static void completarTarea() {
        listarTareas();
        System.out.print("Introduce el número de la tarea a completar: ");
        int index = Integer.parseInt(sc.nextLine());

        if (index >= 0 && index < tareas.size()) {
            tareas.get(index).setCompletado(true);
            System.out.println("Tarea marcada como completada.");
        } else {
            System.out.println("Índice no válido.");
        }
    }

    private static void eliminarTarea() {
        listarTareas();
        System.out.print("Introduce el número de la tarea a eliminar: ");
        int index = Integer.parseInt(sc.nextLine());

        if (index >= 0 && index < tareas.size()) {
            tareas.remove(index);
            System.out.println("Tarea eliminada.");
        } else {
            System.out.println("Índice no válido.");
        }
    }
}
