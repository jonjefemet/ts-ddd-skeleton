/* Una excepción, en el contexto de programación y manejo de errores, se refiere a un evento inusual o no esperado que ocurre durante la ejecución de un programa. Cuando ocurre una excepción, el flujo normal del programa se interrumpe y se busca un manejador de excepciones para manejar la situación. */

type Exception = {
  code: string;
  message: string;
};

export default Exception;