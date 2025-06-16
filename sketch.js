let trator;
let milho;
let pontos = 0;
let caminhao;
let milhoNoCaminhao = 0;
let prediosCidade = [];

function setup() {
  createCanvas(400, 400);
  trator = createVector(100, 200);
  caminhao = createVector(320, 350);
  novoMilho();
  
  // Prédios da cidade só no topo perto do texto "CIDADE"
  let xBase = 210;
  for (let i = 0; i < 4; i++) {
    prediosCidade.push({
      x: xBase + i * 45,
      y: 40,
      w: 35,
      h: random(60, 90),
      cor: color(random(150, 200), random(100, 150), random(50, 100))
    });
  }
}

function draw() {
  background(135, 206, 235); // Céu azul

  desenharCampo();
  desenharCidade();

  desenharMilho();
  desenharTrator(trator.x, trator.y);
  desenharCaminhao(caminhao.x, caminhao.y);
  moverTrator();

  if (!milho.coletado && dist(trator.x, trator.y, milho.x, milho.y) < 20) {
    milho.coletado = true;
  }

  if (milho.coletado && dist(trator.x, trator.y, caminhao.x + 30, caminhao.y + 10) < 40) {
    pontos++;
    milhoNoCaminhao++;
    novoMilho();
  }

  fill(0);
  textSize(14);
  text("Pontos: " + pontos, 10, 390);
  text("Milhos no caminhão: " + milhoNoCaminhao, 10, 370);
}

// ====== DESENHOS ======

function desenharCampo() {
  fill(85, 168, 104);
  rect(0, 0, 200, 400);

  fill(255);
  textSize(14);
  text("CAMPO", 70, 20);

  desenharHorta();
  desenharAnimal();
  desenharCasa();
}

function desenharCidade() {
  fill(190, 220, 170);
  rect(200, 0, 200, 400);

  fill(0);
  textSize(14);
  text("CIDADE", 270, 30);

  // Prédios só no topo
  for (let p of prediosCidade) {
    fill(p.cor);
    rect(p.x, p.y, p.w, p.h, 10);

    // Janelas organizadas
    fill(255, 255, 220);
    let linhas = floor(p.h / 20) - 1;
    for (let i = 0; i < linhas; i++) {
      rect(p.x + 5, p.y + 10 + i * 20, 10, 15, 4);
      rect(p.x + p.w - 15, p.y + 10 + i * 20, 10, 15, 4);
    }

    // Porta no centro embaixo
    fill(100, 50, 20);
    rect(p.x + p.w/2 - 7, p.y + p.h - 25, 15, 25, 6);
  }

  desenharLojinha();
}

function desenharHorta() {
  let yStart = 280;
  for (let row = 0; row < 8; row++) {
    let corFila = (floor(row / 2) % 2 == 0) ? color(34, 139, 34) : color(220, 30, 30); // 2 verdes, 2 vermelhos alternando
    for (let x = 30; x < 170; x += 20) {
      fill(corFila);
      ellipse(x, yStart + row * 10, 8, 12);
    }
  }
}

function desenharAnimal() {
  fill(255);
  rect(60, 100, 20, 12, 3);
  fill(0);
  ellipse(63, 100, 4);
  fill(150);
  ellipse(70, 112, 6);
  rect(60, 112, 3, 8);
  rect(75, 112, 3, 8);
}

function desenharCasa() {
  fill(210, 105, 30);
  rect(120, 100, 30, 30, 6);

  // Telhado mais simétrico
  fill(139, 69, 19);
  triangle(115, 100, 135, 80, 155, 100);

  // Janela retinha, centralizada
  fill(255);
  rect(130, 115, 10, 12, 4);

  // Moldura da janela
  stroke(120, 70, 20);
  strokeWeight(2);
  noFill();
  rect(130, 115, 10, 12, 4);
  noStroke();
}

function desenharLojinha() {
  fill(200, 160, 120);
  rect(250, 270, 60, 60, 8);

  fill(150, 75, 0);
  triangle(245, 270, 310, 270, 277, 240);

  fill(100, 50, 20);
  rect(280, 300, 15, 30, 5);

  fill(255, 255, 220);
  rect(260, 290, 15, 20, 4);
  rect(295, 290, 15, 20, 4);

  stroke(180, 140, 90);
  strokeWeight(2);
  line(267, 290, 267, 310);
  line(260, 300, 275, 300);
  line(302, 290, 302, 310);
  line(295, 300, 310, 300);
  noStroke();

  fill(255);
  textSize(12);
  textAlign(CENTER);
  text("Lojinha", 280, 260);
  textAlign(LEFT);
}

function desenharMilho() {
  if (!milho.coletado) {
    push();
    translate(milho.x, milho.y);
    fill(255, 223, 0);
    ellipse(0, 0, 12, 20);
    fill(34, 139, 34);
    triangle(-6, -10, 0, -20, 6, -10);
    pop();
  }
}

function desenharTrator(x, y) {
  push();
  translate(x, y);

  fill(50);
  ellipse(5, 20, 12);
  ellipse(25, 20, 12);

  fill(255, 0, 0);
  rect(0, 5, 30, 12, 3);

  fill(0, 100, 255);
  rect(15, 0, 12, 10, 2);

  pop();
}

function desenharCaminhao(x, y) {
  push();
  translate(x, y);

  fill(50);
  ellipse(10, 30, 15);
  ellipse(70, 30, 15);

  fill(255, 165, 0);
  rect(0, 10, 80, 25, 5);

  fill(255, 140, 0);
  rect(60, 0, 20, 35, 5);

  fill(200, 230, 255);
  rect(65, 10, 10, 15, 3);

  if (dist(trator.x, trator.y, caminhao.x + 30, caminhao.y + 10) < 40) {
    fill(255, 223, 0);
    for (let i = 0; i < milhoNoCaminhao; i++) {
      let cx = 10 + (i % 7) * 10;
      let cy = 15 + floor(i / 7) * 10;
      ellipse(cx, cy, 8, 12);
    }
  }

  pop();
}

function moverTrator() {
  if (keyIsDown(LEFT_ARROW)) trator.x -= 2;
  if (keyIsDown(RIGHT_ARROW)) trator.x += 2;
  if (keyIsDown(UP_ARROW)) trator.y -= 2;
  if (keyIsDown(DOWN_ARROW)) trator.y += 2;
  trator.x = constrain(trator.x, 0, width - 30);
  trator.y = constrain(trator.y, 0, height - 30);
}

function novoMilho() {
  milho = createVector(random(30, 170), random(60, 250));
  milho.coletado = false;
}