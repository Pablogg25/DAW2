import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import $eventosController from "../api/EventosController";

function CalendarioPage() {
  const [eventos, setEventos] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  async function cargarEventos() {
    const resp = await $eventosController.getEventos();

    const mapeados = resp.data.map((item) => ({
      id: item.eventoId,
      title: item.titulo,
      start: item.fecha_inicio.replace(" ", "T"),
      end: item.fecha_fin.replace(" ", "T"),
      extendedProps: item,
    }));

    setEventos(mapeados);
  }

  useEffect(() => {
    cargarEventos();
  }, []);

  function handleDateClick(info) {
    setFechaSeleccionada(info.dateStr);
  }

  function handleEventClick(info) {
    const ev = info.event;
    alert(
      `Evento: ${ev.title}\nTrabajoId: ${ev.extendedProps.trabajoId ?? "n/a"}`,
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        padding: "20px",
        gap: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* CALENDARIO GRANDE */}
      <div
        style={{
          flex: 1,
          minWidth: "0", // IMPORTANTE para que FullCalendar se expanda
          background: "#fff",
          borderRadius: "12px",
          padding: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="es"
          events={eventos}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="100%"
        />
      </div>

      {/* PANEL LATERAL PEQUEÑO */}
      <div
        className="panel-lateral"
        style={{
          width: "280px",
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          overflowY: "auto",
        }}
      >
        <h3>Tareas del día</h3>

        {fechaSeleccionada && <p>Fecha seleccionada: {fechaSeleccionada}</p>}

        <ul>
          {eventos
            .filter((e) =>
              fechaSeleccionada ? e.start.startsWith(fechaSeleccionada) : false,
            )
            .map((e) => (
              <li
                key={e.id}
                style={{
                  background: "#f5f5f5",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <strong>{e.title}</strong>
                <br />
                {e.extendedProps.descripcion}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default CalendarioPage;
