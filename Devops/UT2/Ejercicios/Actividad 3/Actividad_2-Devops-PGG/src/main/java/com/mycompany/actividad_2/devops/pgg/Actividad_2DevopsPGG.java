/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package com.mycompany.actividad_2.devops.pgg;

import java.util.List;
import java.util.Scanner;

/**
 *
 * @author daw221@iesmhp.local
 */
public class Actividad_2DevopsPGG {

    public static void main(String[] args) {
        TareaManager manager = new TareaManager();
        Scanner scanner = new Scanner(System.in);
        int opcion = -1;

        while (opcion != 0) {
            System.out.println("\n--- GESTOR DE TAREAS DEVOPS (MYSQL) ---");
            System.out.println("1. Consultar listado de tareas");
            System.out.println("2. Añadir nueva tarea");
            System.out.println("3. Actualizar tarea por ID");
            System.out.println("4. Borrar tarea por ID");
            System.out.println("0. Salir");
            System.out.print("Elige una opción: ");

            try {
                opcion = Integer.parseInt(scanner.nextLine());
            } catch (NumberFormatException e) {
                System.out.println("Error: Introduce un número válido.");
                continue;
            }

            switch (opcion) {
                case 1:
                    List<String> lista = manager.listarTareas();
                    System.out.println("\nTareas en MySQL:");
                    if (lista.isEmpty()) {
                        System.out.println("(Base de datos vacía)");
                    } else {
                        lista.forEach(System.out::println);
                    }
                    break;
                case 2:
                    System.out.print("Descripción de la nueva tarea: ");
                    if (manager.agregarTarea(scanner.nextLine())) {
                        System.out.println("Guardada en MySQL.");
                    } else {
                        System.out.println("Error al guardar.");
                    }
                    break;
                case 3:
                    System.out.print("ID de la tarea a actualizar: ");
                    try {
                        int idAct = Integer.parseInt(scanner.nextLine());
                        System.out.print("Nueva descripción: ");
                        if (manager.actualizarTarea(idAct, scanner.nextLine())) {
                            System.out.println("Actualizada en MySQL.");
                        } else {
                            System.out.println("ID no encontrado.");
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("ID inválido.");
                    }
                    break;
                case 4:
                    System.out.print("ID de la tarea a borrar: ");
                    try {
                        int idDel = Integer.parseInt(scanner.nextLine());
                        if (manager.eliminarTarea(idDel)) {
                            System.out.println("Eliminada de MySQL.");
                        } else {
                            System.out.println("ID no encontrado.");
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("ID inválido.");
                    }
                    break;
                case 0:
                    System.out.println("Cerrando aplicación...");
                    break;
                default:
                    System.out.println("Opción no válida.");
            }
        }
        scanner.close();
    }
}

