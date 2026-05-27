// src/data/treasures.js

export const treasuresData = [
  {
    id: 1, // Identificação única
    name: "Golden Oak Library (Biblioteca da Twilight)", // Localização no SENAI/Mapa
    coordinates: { 
      lat: -22.9023, 
      lng: -47.0605 
    },
    unlockRadius: 5,
    guardian: "Twilight Sparkle", 
    pistaVisual: "pony_clue_piece_1.png", 
    quiz: {
      question: "Twilight descobriu que uma tag semântica ajuda os navegadores. Qual tag abaixo não é considerada semântica no HTML5?", 
      options: ["<article>", "<div>", "<aside>", "<section>"],
      correctAnswerIndex: 1 
    },
    reward: { 
      complete: "AMI", 
      incomplete: "A...", 
      status: "locked" 
    }
  },
  {
    id: 2,
    name: "Sweet Apple Acres (Fazenda da Applejack)",
    coordinates: { 
      lat: -22.9020, 
      lng: -47.0601 
    },
    unlockRadius: 5,
    guardian: "Applejack",
    pistaVisual: "pony_clue_piece_2.png",
    quiz: {
      question: "Applejack quer saber: O React usa um conceito para atualizar o DOM de forma eficiente. Qual é esse conceito?",
      options: ["DOM Real", "DOM Dinâmico", "DOM Virtual", "DOM do Framework"],
      correctAnswerIndex: 2
    },
    reward: {
      complete: "ZADE ",
      incomplete: "...DE ",
      status: "locked"
    }
  },
  {
    id: 3,
    name: "Carousel Boutique (Ateliê da Rarity)",
    coordinates: { 
      lat: -22.9026, 
      lng: -47.0610 
    },
    unlockRadius: 5,
    guardian: "Rarity",
    pistaVisual: "pony_clue_piece_3.png",
    quiz: {
      question: "Rarity sabe sobre estilo! Para tornar os estilos do seu componente React exclusivos e evitar conflitos, qual ferramenta é recomendada?",
      options: ["BEM", "Global CSS", "Atomic CSS", "CSS Modules ou Styled Components"],
      correctAnswerIndex: 3
    },
    reward: {
      complete: " É ",
      incomplete: "... ",
      status: "locked"
    }
  },
  {
    id: 4,
    name: "Cottage da Fluttershy (Casa da Fluttershy)",
    coordinates: { 
      lat: -22.9028, 
      lng: -47.0603 
    },
    unlockRadius: 5,
    guardian: "Fluttershy",
    pistaVisual: "pony_clue_piece_4.png",
    quiz: {
      question: "Fluttershy precisa saber onde seus bichinhos estão! Qual API do navegador você deve usar para obter a posição atual do jogador?",
      options: ["GPS API", "Location API", "Navigator.geolocation", "Maps API"],
      correctAnswerIndex: 2 
    },
    reward: {
      complete: "MÁG",
      incomplete: "MA...",
      status: "locked"
    }
  },
  {
    id: 5,
    name: "Academia Wonderbolt (Com Rainbow Dash)",
    coordinates: { 
      lat: -22.9015, 
      lng: -47.0608 
    },
    unlockRadius: 5,
    guardian: "Rainbow Dash",
    pistaVisual: "pony_clue_piece_5.png",
    quiz: {
      question: "Rainbow Dash é veloz! Para que seu aplicativo funcione offline e rápido no celular, qual tecnologia é fundamental em um PWA?",
      options: ["API Gateway", "Service Worker", "Cache API", "IndexedDB"],
      correctAnswerIndex: 1 
    },
    reward: {
      complete: "ICA.",
      incomplete: "..A.",
      status: "locked"
    }
  },
  {
    id: 6,
    name: "Sugarcube Corner (Confeitaria da Pinkie Pie)",
    coordinates: { 
      lat: -22.9025, 
      lng: -47.0612 
    },
    unlockRadius: 5,
    guardian: "Pinkie Pie",
    pistaVisual: "pony_clue_piece_6.png",
    quiz: {
      question: "Pinkie Pie quer fazer uma festa surpresa! Qual evento JavaScript é disparado quando o jogador começa a arrastar um elemento na interface?",
      options: ["ondragstart", "onclick", "onmouseover", "onkeydown"],
      correctAnswerIndex: 0 
    },
    reward: {
      complete: "O Enigma Final está revelado! Junte as peças no inventário para ler a frase mágica.",
      incomplete: "Tente novamente...",
      status: "locked"
    }
  }
];