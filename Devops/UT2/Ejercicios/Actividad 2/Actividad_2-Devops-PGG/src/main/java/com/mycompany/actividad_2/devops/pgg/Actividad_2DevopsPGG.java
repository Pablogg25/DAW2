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
            System.out.println("\n--- GESTOR DE TAREAS DEVOPS ---");
            System.out.println("1. Consultar listado de tareas");
            System.out.println("2. Añadir nueva tarea");
            System.out.println("3. Actualizar tarea existente");
            System.out.println("4. Borrar tarea");
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
                    System.out.println("\nListado actual:");
                    if (lista.isEmpty()) {
                        System.out.println("(No hay tareas)");
                    } else {
                        for (int i = 0; i < lista.size(); i++) {
                            System.out.println(i + ". " + lista.get(i));
                        }
                    }
                    break;
                case 2:
                    System.out.print("Introduce la descripción de la nueva tarea: ");
                    String nueva = scanner.nextLine();
                    if (manager.agregarTarea(nueva)) {
                        System.out.println("Tarea añadida correctamente.");
                    } else {
                        System.out.println("No se pudo añadir (texto vacío).");
                    }
                    break;
                case 3:
                    System.out.print("Introduce el índice de la tarea a actualizar: ");
                    try {
                        int idxAct = Integer.parseInt(scanner.nextLine());
                        System.out.print("Nueva descripción: ");
                        String descAct = scanner.nextLine();
                        if (manager.actualizarTarea(idxAct, descAct)) {
                            System.out.println("Tarea actualizada.");
                        } else {
                            System.out.println("Índice inválido o texto vacío.");
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Índice no válido.");
                    }
                    break;
                case 4:
                    System.out.print("Introduce el índice de la tarea a borrar: ");
                    try {
                        int idxDel = Integer.parseInt(scanner.nextLine());
                        if (manager.eliminarTarea(idxDel)) {
                            System.out.println("Tarea eliminada correctamente.");
                        } else {
                            System.out.println("Índice fuera de rango.");
                        }
                    } catch (NumberFormatException e) {
                        System.out.println("Índice no válido.");
                    }
                    break;
                case 0:
                    System.out.println("Saliendo de la aplicación...");
                    break;
                default:
                    System.out.println("Opción no reconocida.");
            }
        }
        scanner.close();
    }
}
