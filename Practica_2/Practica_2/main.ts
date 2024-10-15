//Practica 2 Lucía Camiña y Vicente Wang

const developerJokes = [ "¿Por qué los desarrolladores odian la naturaleza? Porque tiene demasiados bugs.", "Un SQL entra en un bar, se acerca a dos mesas y pregunta: '¿Puedo unirme?'", "¡He terminado mi código a tiempo! – Nadie, nunca.", "Si no funciona, añade más `console.log()`.", "¿Cuántos programadores se necesitan para cambiar una bombilla? Ninguno, es un problema de hardware.", "No me asusto fácilmente... excepto cuando veo código sin `;` al final.", "Los desarrolladores no envejecen, solo se depuran.", "El único lugar donde puedes escapar de una excepción es en Java.", "Frontend sin diseño es como un backend sin lógica.", "¿Por qué los programadores prefieren el té? Porque en Java no hay café.", "Hay 10 tipos de personas en el mundo: las que entienden binario y las que no.", "Siempre prueba tu código... excepto cuando funciona.", "Tu código no está roto, solo es 'funcionalidad no documentada'.", "En qué se parecen los programadores y los gatos? En que odian mojarse y no pueden dejar de jugar con cosas que no deberían.", "Mi código funciona... hasta que lo toco de nuevo.", "¿Por qué los desarrolladores odian la luz del sol? Porque depuran en la oscuridad.", "Cuando crees que has eliminado todos los bugs, aparece el 'bug final'.", "Git es como un horóscopo: nunca entiendes los conflictos.", "Un desarrollador sin bugs es como un unicornio, no existe.", "En mi máquina funciona... pero no en producción." ];

const handler =  async (req: Request): Promise<Response> => {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;
    const searchParams = url.searchParams;
    let key = 1;
  
    if (method === "GET") {
      if(path.startsWith("/jokes")){
        const index = searchParams.get("index");
        if(index){
            const jokeIndex = parseInt(index);
            return new Response(JSON.stringify(developerJokes[jokeIndex]))
        }else{
        return new Response(JSON.stringify(developerJokes[0]));}
      }else if(path.startsWith("/calcular")){
        const num1 = searchParams.get("num1");
        const num2 = searchParams.get("num2");
        const op = searchParams.get("op");

        if(num1 && num2){
            const num1Int = parseInt(num1);
            const num2Int = parseInt(num2);
            if(op === "suma"){
                return new Response(JSON.stringify(num1Int + num2Int));
            }else if(op === "resta"){
                return new Response(JSON.stringify(num1Int - num2Int));
            }else if(op === "multiplicacion"){
                return new Response(JSON.stringify(num1Int * num2Int));
            }else if(op === "division"){
                return new Response(JSON.stringify(num1Int / num2Int));
            }
        }
      }else if(path.startsWith("/reverso/")){
        const palabra = path.split("/")[2];
        if(palabra !== null){
          const rev = palabra.split("").reverse().join("");
          const detalles = searchParams.get("detalles") === "true";
          if(detalles){
            const longitud :number = rev.length; 
            return new Response(JSON.stringify({"reverso": rev , "longitud": longitud}));
  
          }
        }
      }
    }
  
    return new Response("Endpoint not found", { status: 404 });
  };
  
  Deno.serve({ port: 3000 }, handler);
  