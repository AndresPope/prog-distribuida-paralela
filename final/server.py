# server.py
import socket
import threading
import random
import time
import wikipedia

# Palabras iniciales base
WORDS = ["PYTHON", "SOCKET", "THREAD", "ARRAY", "OBJECT"]

# Direcciones posibles para colocar palabras
DIRECTIONS = [
    (0, 1), (0, -1), (1, 0), (-1, 0),
    (1, 1), (1, -1), (-1, -1), (-1, 1)
]


def generate_board(size=25):
    return [[' ' for _ in range(size)] for _ in range(size)]


def place_word(board, word, max_attempts=100):
    size = len(board)
    for _ in range(max_attempts):
        dir_x, dir_y = random.choice(DIRECTIONS)
        start_x = random.randint(0, size - 1)
        start_y = random.randint(0, size - 1)

        end_x = start_x + dir_x * (len(word) - 1)
        end_y = start_y + dir_y * (len(word) - 1)

        if 0 <= end_x < size and 0 <= end_y < size:
            if all(board[start_x + i * dir_x][start_y + i * dir_y] == ' ' for i in range(len(word))):
                for i in range(len(word)):
                    board[start_x + i * dir_x][start_y + i * dir_y] = word[i]
                return True  # Se colocó con éxito
    return False  # Falló tras varios intentos



def fill_empty(board):
    for i in range(len(board)):
        for j in range(len(board[i])):
            if board[i][j] == ' ':
                board[i][j] = random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')


def build_board_with_words(words):
    board = generate_board()
    for word in words:
        place_word(board, word)
    fill_empty(board)
    return board


def board_to_string(board):
    return '\n'.join([' '.join(row) for row in board])


def get_related_words(query):
    try:
        summary = wikipedia.summary(query, sentences=1)
        words = [w.strip('.,()[]"\'') for w in summary.upper().split() if w.isalpha() and len(w) >= 4]
        unique_words = list(dict.fromkeys(words))  # Evita duplicados, mantiene orden
        return unique_words[:5]
    except Exception as e:
        print(f"Error al buscar en Wikipedia para '{query}': {e}")
        return [query.upper()]


def handle_client(conn, addr):
    print(f"[+] Cliente conectado desde {addr}")
    words = WORDS.copy()
    board = build_board_with_words(words) 
    start_time = time.time()

    try:
        conn.sendall(board_to_string(board).encode())

        while True:
            data = conn.recv(1024).decode().strip()
            if not data:
                break

            if data == 'RESOLVER':
                conn.sendall(f"Palabras:\n{'\n'.join(words)}".encode())

            elif data == 'TIEMPO':
                elapsed = time.time() - start_time
                conn.sendall(f"Tiempo: {elapsed:.2f} segundos".encode())

            elif data.startswith('AGREGAR'):
                _, palabra = data.split(maxsplit=1)
                related = get_related_words(palabra)

                for r in related:
                    if r not in words:
                        words.append(r)

                board = build_board_with_words(words)
                tablero = board_to_string(board)
                lista_palabras = '\n'.join(words)

                respuesta = tablero + "\n===PALABRAS===\n" + lista_palabras
                conn.sendall(respuesta.encode())

            elif data == 'SALIR':
                print(f"[-] Cliente {addr} se desconectó.")
                break

    except Exception as e:
        print(f"[!] Error con cliente {addr}: {e}")

    finally:
        conn.close()



def start_server(host='localhost', port=5555):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((host, port))
    server.listen()
    print(f"[+] Servidor escuchando en {host}:{port}")

    try:
        while True:
            conn, addr = server.accept()
            thread = threading.Thread(target=handle_client, args=(conn, addr), daemon=True)
            thread.start()
    except KeyboardInterrupt:
        print("\n[!] Servidor detenido manualmente.")
    finally:
        server.close()


if __name__ == "__main__":
    start_server()