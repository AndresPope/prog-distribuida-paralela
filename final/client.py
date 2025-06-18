import socket
import tkinter as tk
from tkinter import messagebox, simpledialog
import threading
import wikipedia
import re
import time

COLORS = [
    "#FFB3BA",  # pastel red
    "#FFDFBA",  # pastel orange
    "#FFFFBA",  # pastel yellow
    "#BAFFC9",  # pastel green
    "#BAE1FF",  # pastel blue
    "#E5BAFF",  # pastel purple
    "#FFC9DE",  # pastel pink
    "#C9FFF4",  # pastel aqua
    "#E0FFBA",  # pastel lime
    "#F7BAFF"   # pastel magenta
]

class SopaClient:
    def __init__(self, master):
        self.master = master
        self.master.title("Sopa de Letras - Cliente")
        self.master.geometry("800x600")

        self.words = ["PYTHON", "SOCKET", "THREAD", "ARRAY", "OBJECT"]

        # === Frame principal con fondo blanco ===
        self.frame = tk.Frame(master, bg="white")
        self.frame.pack(expand=True, fill='both', padx=10, pady=10)

        self.frame.columnconfigure(0, weight=1)
        self.frame.columnconfigure(1, weight=0)
        self.frame.rowconfigure(0, weight=1)

        # === Subframe para centrar verticalmente el tablero ===
        self.centro_frame = tk.Frame(self.frame, bg="white")
        self.centro_frame.grid(row=0, column=0, sticky="nsew")
        self.centro_frame.columnconfigure(0, weight=1)
        self.centro_frame.rowconfigure(0, weight=1)

        self.text_tablero = tk.Text(
            self.centro_frame,
            width=40,
            height=20,
            font=("Courier", 12),
            bg="white",
            padx=40,            # Espacio interno horizontal
            wrap="none",         # Para evitar que el texto se corte
            bd=0,
            highlightthickness=0,
            relief="flat"
        )
        self.text_tablero.tag_configure("espaciado", lmargin1=10)
        self.text_tablero.grid(row=0, column=0, sticky="nsew", pady=20)

        # === Panel derecho ===
        self.panel_derecho = tk.Frame(self.frame, bg="white")
        self.panel_derecho.grid(row=0, column=1, sticky="n", padx=10, pady=10)

       
        self.text_tablero.bind("<Button-1>", self.clic_letra)


        self.listbox_palabras = tk.Listbox(self.panel_derecho, width=20, height=20, bg="white", font=("Arial", 12), bd=0, highlightthickness=0)
        self.listbox_palabras.pack(pady=(10, 10))


        # === Cronómetro ===
        self.tiempo_label = tk.Label(self.frame, text="00:00", font=("Arial", 14, "bold"), fg="darkred", bg="white")

        self.panel_derecho = tk.Frame(self.frame, bg="white")
        self.panel_derecho.grid(row=0, column=1, sticky="ns", padx=10)

        self.tiempo_label = tk.Label(self.panel_derecho, text="00:00", font=("Arial", 14, "bold"), fg="darkred", bg="white")
        self.tiempo_label.pack(anchor="n", pady=(30, 10))

        self.label_palabras = tk.Label(self.panel_derecho, text="Palabras a buscar:", font=("Arial", 12, "bold"), bg="white")
        self.label_palabras.pack(anchor="n", pady=(30, 5))

        self.listbox_palabras = tk.Listbox(self.panel_derecho, height=20, bg="white")
        self.listbox_palabras.pack(anchor="n", pady=(0, 10))

        

        # === Botones ===
        self.button_frame = tk.Frame(master, bg="white")
        self.button_frame.pack(pady=10)

        self.resolver_button = tk.Button(self.button_frame, text="Resolver", command=self.resolver)
        self.resolver_button.grid(row=0, column=0, padx=5)


        self.agregar_button = tk.Button(self.button_frame, text="Agregar Palabra", command=self.agregar_palabra)
        self.agregar_button.grid(row=0, column=1, padx=5)

        self.salir_button = tk.Button(self.button_frame, text="Salir", command=self.salir)
        self.salir_button.grid(row=0, column=2, padx=5)

        # === Conexión y cronómetro ===
        self.board_lines = []
        self.conectar()

        self.inicio_tiempo = time.time()
        self.actualizar_cronometro()



    def conectar(self):
        try:
            self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            self.client.connect(('localhost', 5555))
            data = self.recibir_respuesta()
            self.board_lines = data.strip().split('\n')
            self.actualizar_lista()
            self.display_board(self.board_lines)
        except Exception as e:
            messagebox.showerror("Error", f"No se pudo conectar con el servidor:\n{e}")
            self.master.destroy()

    def enviar_comando(self, comando):
        try:
            self.client.send(comando.encode())
        except Exception as e:
            self.master.after(0, lambda: messagebox.showerror("Error", f"Error al enviar comando:\n{e}"))

    def recibir_respuesta(self, buffer=4096):
        try:
            data = self.client.recv(buffer)
            if not data:
                raise ConnectionError("Conexión cerrada por el servidor")
            return data.decode()
        except Exception as e:
            self.master.after(0, lambda: messagebox.showerror("Error", f"Error al recibir datos:\n{e}"))
            return ""

    def display_board(self, board_lines, highlight=False):
        self.text_tablero.config(state=tk.NORMAL)
        self.text_tablero.delete(1.0, tk.END)

        for line in board_lines:
            self.text_tablero.insert(tk.END, line + '\n')

        if highlight:
            for idx, word in enumerate(self.words):
                self.highlight_word(word, COLORS[idx % len(COLORS)])

        self.text_tablero.config(state=tk.DISABLED)

    def highlight_word(self, word, color="red"):
        content = self.text_tablero.get(1.0, tk.END).split('\n')
        content = [line for line in content if line.strip()]

        rows = len(content)
        cols = len(content[0].replace(" ", ""))

        directions = [
            (0, 1), (0, -1), (1, 0), (-1, 0),
            (1, 1), (1, -1), (-1, -1), (-1, 1)
        ]

        for x in range(rows):
            for y in range(cols):
                for dx, dy in directions:
                    positions = []
                    for k in range(len(word)):
                        nx, ny = x + dx * k, y + dy * k
                        if 0 <= nx < rows and 0 <= ny < cols:
                            try:
                                char = content[nx][ny * 2]
                            except IndexError:
                                break
                            if char.upper() != word[k].upper():
                                break
                            positions.append((nx + 1, ny + 1))
                        else:
                            break
                    else:
                        for row, col in positions:
                            self.highlight_position(row, col, word, color)

    def clic_letra(self, event):
        index = self.text_tablero.index(f"@{event.x},{event.y}")  # obtiene índice tipo '5.12'
        fila, col = map(int, index.split("."))

        letra = self.text_tablero.get(index)
        if letra.strip():  # evitar espacios en blanco
            tag = f"resaltado_{fila}_{col}"
            self.text_tablero.tag_add(tag, index, f"{fila}.{col + 1}")
            self.text_tablero.tag_config(tag, background="yellow", foreground="black")

    

    def resaltar_letra(self, fila, col, color):
        tag = f"resuelto_{fila}_{col}"
        index = f"{fila}.{col}"
        self.text_tablero.tag_add(tag, index, f"{fila}.{col + 1}")
        self.text_tablero.tag_config(tag, background=color, foreground="white")

    def limpiar_resaltados_click(self):
        for tag in self.text_tablero.tag_names():
            if tag.startswith("resaltado_"):
                self.text_tablero.tag_delete(tag)

    def highlight_position(self, row, col, word, color):
        try:
            line = self.text_tablero.get(f"{row}.0", f"{row}.end")
            nonspace_index = 0
            for i, c in enumerate(line):
                if c != ' ':
                    if nonspace_index == col - 1:
                        char_index = i
                        break
                    nonspace_index += 1
            index_start = f"{row}.{char_index}"
            index_end = f"{row}.{char_index + 1}"
            tag_name = f"tag_{word}_{row}_{col}"
            self.text_tablero.tag_add(tag_name, index_start, index_end)
            self.text_tablero.tag_config(tag_name, background=color, foreground="black", font=("Courier", 12, "bold"))
        except:
            pass

    def agregar_palabra(self):
        palabra = simpledialog.askstring("Agregar Palabra", "Ingresa una palabra:")
        if not palabra:
            return
        if not re.fullmatch(r"[A-Za-z]{3,}", palabra):
            messagebox.showerror("Entrada inválida", "Solo letras sin acentos ni símbolos (mínimo 3 caracteres).")
            return

        threading.Thread(target=self.fetch_related, args=(palabra,), daemon=True).start()

    def actualizar_cronometro(self):
        elapsed = int(time.time() - self.inicio_tiempo)
        minutos = elapsed // 60
        segundos = elapsed % 60
        self.tiempo_label.config(text=f"{minutos:02d}:{segundos:02d}")
        self.master.after(1000, self.actualizar_cronometro)

    def fetch_related(self, palabra):
        self.enviar_comando(f"AGREGAR {palabra}")
        nuevas_palabras = []
        try:
            respuesta = self.recibir_respuesta()
            if "===PALABRAS===" in respuesta:
                tablero, palabras = respuesta.split("===PALABRAS===")
                self.board_lines = tablero.strip().split('\n')
                palabras_nuevas = [p.strip().upper() for p in palabras.strip().split('\n') if p.strip()]
                nuevas_palabras = [p for p in palabras_nuevas if p not in self.words]
                self.words = palabras_nuevas  # Actualiza con toda la nueva lista, no solo añade
            else:
                self.board_lines = respuesta.strip().split('\n')

        except Exception as e:
            self.master.after(0, lambda: messagebox.showerror("Error", f"No se pudo completar la operación:\n{e}"))

        self.master.after(0, lambda: self.actualizar_lista(nuevas_palabras))


    def resolver(self):
        self.limpiar_resaltados_click()
        for idx, palabra in enumerate(self.words):
            color = COLORS[idx % len(COLORS)]
            threading.Thread(target=self.highlight_word, args=(palabra, color), daemon=True).start()


    def tiempo(self):
        self.enviar_comando("TIEMPO")
        data = self.recibir_respuesta()
        messagebox.showinfo("Tiempo", data)

    def salir(self):
        try:
            self.enviar_comando("SALIR")
            self.client.close()
        except:
            pass
        self.master.destroy()

    def actualizar_lista(self, nuevas_palabras=None):
        self.listbox_palabras.delete(0, tk.END)
        for palabra in self.words:
            self.listbox_palabras.insert(tk.END, palabra)

        self.display_board(self.board_lines)

        if nuevas_palabras:
            messagebox.showinfo("Agregado", f"Se agregaron: {', '.join(nuevas_palabras)}")
        elif nuevas_palabras == []:
            messagebox.showinfo("Sin novedades", "No se agregaron palabras nuevas.")

    

if __name__ == "__main__":
    root = tk.Tk()
    app = SopaClient(root)
    root.mainloop()