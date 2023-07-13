import React, { useEffect, useRef } from "react";
import './roadTrip.css';

const RoadTripAnimation = () => {
  const canvasRef = useRef(null);
  const canvas2Ref = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvas2 = canvas2Ref.current;
    const ctx = canvas.getContext("2d");
    const ctx2 = canvas2.getContext("2d");

    const colors = {
      sky: "#D4F5FE",
      mountains: "#83CACE",
      ground: "#8FC04C",
      groundDark: "#73B043",
      road: "#606a7c",
      roadLine: "#FFF",
      hud: "#FFF",
    };

    const settings = {
      fps: 60,
      skySize: 120,
      ground: {
        size: 350,
        min: 4,
        max: 120,
      },
      road: {
        min: 76,
        max: 900,
      },
    };

    const state = {
      bgpos: 0,
      offset: 0,
      startDark: true,
      curve: 0,
      currentCurve: 0,
      turn: 0,
      speed: 10,
      xpos: 0,
      section: 50,
      car: {
        maxSpeed: 15,
        friction: 0.4,
        acc: 0.85,
        deAcc: 0.5,
      },
      keypress: {
        up: false,
        left: false,
        right: false,
        down: false,
      },
    };

    const storage = {
      bg: null,
    };

    const drawBg = () => {
      ctx.fillStyle = colors.sky;
      ctx.fillRect(0, 0, canvas.width, settings.skySize);
      drawMountain(0, 60, 200);
      drawMountain(280, 40, 200);
      drawMountain(400, 80, 200);
      drawMountain(550, 60, 200);

      storage.bg = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };

    const drawMountain = (pos, height, width) => {
      ctx.fillStyle = colors.mountains;
      ctx.strokeStyle = colors.mountains;
      ctx.lineJoin = "round";
      ctx.lineWidth = 20;
      ctx.beginPath();
      ctx.moveTo(pos, settings.skySize);
      ctx.lineTo(pos + width / 2, settings.skySize - height);
      ctx.lineTo(pos + width, settings.skySize);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
    };

    const drawRoad = (min, max, squishFactor, color) => {
        const basePos = canvas.width + state.xpos;
      
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo((basePos + min) / 2 - state.currentCurve * 3, settings.skySize);
        ctx.quadraticCurveTo(((basePos / 2) + min) + state.currentCurve / 3 + squishFactor, settings.skySize + 52, (basePos + max) / 2, canvas.height);
        ctx.lineTo((basePos - max) / 2, canvas.height);
        ctx.quadraticCurveTo(((basePos / 2) - min) + state.currentCurve / 3 - squishFactor, settings.skySize + 52, ((basePos - min) / 2) - state.currentCurve * 3, settings.skySize);
        ctx.closePath();
        ctx.fill();
      
        // // Add buttons
        // const buttonWidth = 50;
        // const buttonHeight = 30;
        // const buttonY = canvas.height - 70;
        
        // // Random button positions
        // const button1X = basePos / 2 - buttonWidth / 2;
        // const button2X = basePos / 2 - buttonWidth / 2 + 100;
        // const button3X = basePos / 2 - buttonWidth / 2 - 100;
        // const button4X = basePos / 2 - buttonWidth / 2 - 200;
        
        // // Draw buttons
        // drawButton(button1X, buttonY, buttonWidth, buttonHeight, "Button 1");
        // drawButton(button2X, buttonY, buttonWidth, buttonHeight, "Button 2");
        // drawButton(button3X, buttonY, buttonWidth, buttonHeight, "Button 3");
        // drawButton(button4X, buttonY, buttonWidth, buttonHeight, "Button 4");
      };
      
      const drawButton = (x, y, width, height, text) => {
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(x, y, width, height);
        
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "14px Arial";
        ctx.fillText(text, x + width / 2 - 20, y + height / 2 + 5);
      };

    const drawGround = (ctx, offset, lightColor, darkColor, width) => {
      let pos = settings.skySize - settings.ground.min + offset;
      let stepSize = 1;
      let drawDark = state.startDark;
      let firstRow = true;
      ctx.fillStyle = lightColor;
      ctx.fillRect(0, settings.skySize, width, settings.ground.size);

      ctx.fillStyle = darkColor;
      while (pos <= canvas.height) {
        stepSize = norm(pos, settings.skySize, canvas.height) * settings.ground.max;
        if (stepSize < settings.ground.min) {
          stepSize = settings.ground.min;
        }

        if (drawDark) {
          if (firstRow) {
            ctx.fillRect(
              0,
              settings.skySize,
              width,
              stepSize - (offset > settings.ground.min ? settings.ground.min : settings.ground.min - offset)
            );
          } else {
            ctx.fillRect(
              0,
              pos < settings.skySize ? settings.skySize : pos,
              width,
              stepSize
            );
          }
        }

        firstRow = false;
        pos += stepSize;
        drawDark = !drawDark;
      }
    };

    const drawHUD = (ctx, centerX, centerY, color) => {
      const radius = 50;
      const tigs = [0, 90, 135, 180, 225, 270, 315];
      let angle = 90;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.lineWidth = 7;
      ctx.fillStyle = 'rgba(0, 0, 0)';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.stroke();

      for (let i = 0; i < tigs.length; i++) {
        drawTig(ctx, centerX, centerY, radius, tigs[i], 7);
      }

      // draw pointer
      angle = map(state.speed, 0, state.car.maxSpeed, 90, 360);
      drawPointer(ctx, color, 50, centerX, centerY, angle);
    };

    const drawTig = (ctx, x, y, radius, angle, size) => {
      const startPoint = getCirclePoint(x, y, radius - 4, angle);
      const endPoint = getCirclePoint(x, y, radius - size, angle);

      ctx.beginPath();
      ctx.lineCap = 'round';
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.stroke();
    };

    const getCirclePoint = (x, y, radius, angle) => {
      const radian = (angle / 180) * Math.PI;

      return {
        x: x + radius * Math.cos(radian),
        y: y + radius * Math.sin(radian),
      };
    };

    const drawPointer = (ctx, color, radius, centerX, centerY, angle) => {
      const point = getCirclePoint(centerX, centerY, radius - 20, angle);
      const point2 = getCirclePoint(centerX, centerY, 2, angle + 90);
      const point3 = getCirclePoint(centerX, centerY, 2, angle - 90);

      ctx.beginPath();
      ctx.strokeStyle = "#FF9166";
      ctx.lineCap = 'round';
      ctx.lineWidth = 4;
      ctx.moveTo(point2.x, point2.y);
      ctx.lineTo(point.x, point.y);
      ctx.lineTo(point3.x, point3.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 9, 0, 2 * Math.PI, false);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const calcMovement = () => {
      const move = state.speed * 0.01;
      let newCurve = 0;

      if (state.keypress.up) {
        state.speed += state.car.acc - state.speed * 0.015;
      } else if (state.speed > 0) {
        state.speed -= state.car.friction;
      }

      if (state.keypress.down && state.speed > 0) {
        state.speed -= 1;
      }

      state.xpos -= state.currentCurve * state.speed * 0.005;

      if (state.speed) {
        if (state.keypress.left) {
          state.xpos += (Math.abs(state.turn) + 7 + (state.speed > state.car.maxSpeed / 4 ? state.car.maxSpeed - state.speed / 2 : state.speed)) * 0.2;
          state.turn -= 1;
        }

        if (state.keypress.right) {
          state.xpos -= (Math.abs(state.turn) + 7 + (state.speed > state.car.maxSpeed / 4 ? state.car.maxSpeed - state.speed / 2 : state.speed)) * 0.2;
          state.turn += 1;
        }

        if (state.turn !== 0 && !state.keypress.left && !state.keypress.right) {
          state.turn += state.turn > 0 ? -0.25 : 0.25;
        }
      }

      state.turn = clamp(state.turn, -5, 5);
      state.speed = clamp(state.speed, 0, state.car.maxSpeed);

      state.section -= state.speed;

      if (state.section < 0) {
        state.section = randomRange(1000, 9000);

        newCurve = randomRange(-50, 50);

        if (Math.abs(state.curve - newCurve) < 20) {
          newCurve = randomRange(-50, 50);
        }

        state.curve = newCurve;
      }

      if (state.currentCurve < state.curve && move < Math.abs(state.currentCurve - state.curve)) {
        state.currentCurve += move;
      } else if (state.currentCurve > state.curve && move < Math.abs(state.currentCurve - state.curve)) {
        state.currentCurve -= move;
      }

      if (Math.abs(state.xpos) > 550) {
        state.speed *= 0.96;
      }

      state.xpos = clamp(state.xpos, -650, 650);
    };

    const keyUp = (e) => {
      move(e, false);
    };

    const keyDown = (e) => {
      move(e, true);
    };

    const move = (e, isKeyDown) => {
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        e.preventDefault();
      }

      if (e.keyCode === 37) {
        state.keypress.left = isKeyDown;
      }

      if (e.keyCode === 38) {
        state.keypress.up = isKeyDown;
      }

      if (e.keyCode === 39) {
        state.keypress.right = isKeyDown;
      }

      if (e.keyCode === 40) {
        state.keypress.down = isKeyDown;
      }
    };

    const randomRange = (min, max) => {
      return min + Math.random() * (max - min);
    };

    const norm = (value, min, max) => {
      return (value - min) / (max - min);
    };

    const lerp = (norm, min, max) => {
      return (max - min) * norm + min;
    };

    const map = (value, sourceMin, sourceMax, destMin, destMax) => {
      return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
    };

    const clamp = (value, min, max) => {
      return Math.min(Math.max(value, min), max);
    };

    const drawCar = () => {
      const carWidth = 160;
      const carHeight = 50;
      const carX = canvas.width / 2 - carWidth / 2;
      const carY = 320;

      // shadow
      roundedRect(ctx, "rgba(0, 0, 0, 0.35)", carX - 1 + state.turn, carY + carHeight - 35, carWidth + 10, carHeight, 9);

      // tires
      roundedRect(ctx, "#111", carX-20, carY + carHeight - 30, 30, 40, 6);
      roundedRect(ctx, "#111", carX -45 + carWidth, carY + carHeight - 30, 30, 40, 6);

      drawCarBody(ctx);
    };

    const roundedRect = (ctx, color, x, y, width, height, radius, turn, turneffect) => {
      const skew = turn === true ? state.turn * turneffect : 0;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(x + radius, y - skew);

      // top right
      ctx.lineTo(x + width - radius, y + skew);
      ctx.arcTo(x + width, y + skew, x + width, y + radius + skew, radius);
      ctx.lineTo(x + width, y + radius + skew);

      // down right
      ctx.lineTo(x + width, y + height + skew - radius);
      ctx.arcTo(x + width, y + height + skew, x + width - radius, y + height + skew, radius);
      ctx.lineTo(x + width - radius, y + height + skew);

      // down left
      ctx.lineTo(x + radius, y + height - skew);
      ctx.arcTo(x, y + height - skew, x, y + height - skew - radius, radius);
      ctx.lineTo(x, y + height - skew - radius);

      // top left
      ctx.lineTo(x, y + radius - skew);
      ctx.arcTo(x, y - skew, x + radius, y - skew, radius);
      ctx.lineTo(x + radius, y - skew);
      ctx.fill();
    };

    const drawCarBody = (ctx) => {
      const startX = 299;
      const startY = 311;
      const lights = [10, 26, 134, 152];
      let lightsY = 0;

      /* Front */
      roundedRect(ctx, "#C2C2C2", startX + 6 + state.turn * 1.1, startY - 18, 146, 40, 18);

      ctx.beginPath();
      ctx.lineWidth = "12";
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#C2C2C2";
      ctx.moveTo(startX + 30, startY);
      ctx.lineTo(startX + 46 + state.turn, startY - 25);
      ctx.lineTo(startX + 114 + state.turn, startY - 25);
      ctx.lineTo(startX + 130, startY);
      ctx.fill();
      ctx.stroke();
      /* END: Front */

      ctx.lineWidth = "12";
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.fillStyle = "#ff0000";
      ctx.strokeStyle = "#DEE0E2";
      ctx.moveTo(startX + 2, startY + 12 + state.turn * 0.2);
      ctx.lineTo(startX + 159, startY + 12 + state.turn * 0.2);
      ctx.quadraticCurveTo(startX + 166, startY + 35, startX + 159, startY + 55 + state.turn * 0.2);
      ctx.lineTo(startX + 2, startY + 55 - state.turn * 0.2);
      ctx.quadraticCurveTo(startX - 5, startY + 32, startX + 2, startY + 12 - state.turn * 0.2);
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = "12";
      ctx.fillStyle = "#DEE0E2";
      ctx.strokeStyle = "#DEE0E2";
      ctx.moveTo(startX + 30, startY);
      ctx.lineTo(startX + 40 + state.turn * 0.7, startY - 15);
      ctx.lineTo(startX + 120 + state.turn * 0.7, startY - 15);
      ctx.lineTo(startX + 130, startY);
      ctx.fill();
      ctx.stroke();

      roundedRect(ctx, "#474747", startX - 4, startY, 169, 10, 3, true, 0.2);
      roundedRect(ctx, "#474747", startX + 40, startY + 5, 80, 10, 5, true, 0.1);

      ctx.fillStyle = "#FF9166";

      lights.forEach((xPos) => {
        ctx.beginPath();
        ctx.arc(startX + xPos, startY + 20 + lightsY, 6, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        lightsY += state.turn * 0.05;
      });

      ctx.lineWidth = "9";
      ctx.fillStyle = "#222222";
      ctx.strokeStyle = "#444";

      roundedRect(ctx, "#FFF", startX + 60, startY + 25, 40, 18, 3, true, 0.05);
    };
    function drawCoin(ctx, x, y, radius) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'gold'; // Adjust the coin color as needed
      ctx.fill();
      ctx.closePath();
    }
    
    function drawCombinedRoad(minY, maxY, numCoins, coinRadius) {
      drawGround(ctx, state.offset, colors.ground, colors.groundDark, canvas.width);

      drawRoad(settings.road.min + 6, settings.road.max + 16, 10, colors.roadLine);
      drawGround(ctx2, state.offset, colors.roadLine, colors.road, canvas.width);
    drawRoad(settings.road.min, settings.road.max, 10, colors.road);
     drawRoad(3, 24, 0, ctx.createPattern(canvas2, 'repeat'));
      const roadWidth = settings.road.max - settings.road.min;
      const coinSpacing = roadWidth / (numCoins + 1);
      let coinX = settings.road.min + coinSpacing;

  for (let i = 0; i < numCoins; i++) {
    drawCoin(ctx, coinX, (minY + maxY) / 2, coinRadius);
    coinX += coinSpacing;
  }
    }
    
    // Inside the draw() function, call the modified drawRoad() function:
   
    
    
    // Usage example:
    // const canvas = document.getElementById('myCanvas');
    // const context = canvas.getContext('2d');
    const coinRadius = 25; // Adjust the coin radius as needed
    
   
    
    const draw = () => {
      setTimeout(() => {
        calcMovement();

        state.bgpos += (state.currentCurve * 0.02) * (state.speed * 0.2);
        state.bgpos = state.bgpos % canvas.width;

        ctx.putImageData(storage.bg, state.bgpos, 5);
        ctx.putImageData(storage.bg, state.bgpos > 0 ? state.bgpos - canvas.width : state.bgpos + canvas.width, 5);

        state.offset += state.speed * 0.05;
        if (state.offset > settings.ground.min) {
          state.offset = settings.ground.min - state.offset;
          state.startDark = !state.startDark;
        }
        // drawGround(ctx, state.offset, colors.ground, colors.groundDark, canvas.width);

        // drawRoad(settings.road.min + 6, settings.road.max + 16, 10, colors.roadLine);
        // drawGround(ctx2, state.offset, colors.roadLine, colors.road, canvas.width);
        // drawRoad(settings.road.min, settings.road.max, 10, colors.road);
        // drawRoad(3, 24, 0, ctx.createPattern(canvas2, 'repeat'));
        // drawCar();
        // drawCoin(ctx, coinRadius);
        drawCombinedRoad(settings.road.min, settings.road.max, 4, 10); // Adjust the number of coins and coin radius as needed
        drawCar();
        drawHUD(ctx, 630, 340, colors.hud);

        requestAnimationFrame(draw);
      }, 1000 / settings.fps);
    };

    drawBg();
    draw();

    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);
  }, []);

  return (
    <div className="car-animation">
      <canvas ref={canvasRef} width={800} height={600} className="canvas-anim"/>
      <canvas ref={canvas2Ref} width={800} height={600} style={{display:'none'}}/>
    </div>
  );
};

export default RoadTripAnimation;
