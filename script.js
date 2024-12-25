class TechBackground {
    constructor() {
        this.squaresContainer = document.querySelector('.squares-container');
        this.linesContainer = document.querySelector('.lines-container');
        this.particlesContainer = document.querySelector('.particles-container');
        this.matrixCanvas = document.getElementById('matrix-effect');
        this.ctx = this.matrixCanvas.getContext('2d');
        this.squares = [];
        this.lines = [];
        this.particles = [];
        this.matrixChars = [];
        this.init();
    }

    init() {
        this.setupMatrixEffect();
        this.createSquares();
        this.createLines();
        this.createParticles();
        this.animate();
        window.addEventListener('resize', () => this.handleResize());
    }

    setupMatrixEffect() {
        this.matrixCanvas.width = window.innerWidth;
        this.matrixCanvas.height = window.innerHeight;
        const columns = this.matrixCanvas.width / 20;
        const rows = this.matrixCanvas.height / 20;

        for (let i = 0; i < columns; i++) {
            this.matrixChars[i] = 1;
        }
    }

    createSquares() {
        const numberOfSquares = 20;
        
        for (let i = 0; i < numberOfSquares; i++) {
            const square = document.createElement('div');
            square.className = 'square';
            
            const size = Math.random() * 60 + 20;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            
            square.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${startX}px;
                top: ${startY}px;
                opacity: ${Math.random() * 0.5 + 0.1};
            `;
            
            this.squares.push({
                element: square,
                x: startX,
                y: startY,
                size: size,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 2
            });
            
            this.squaresContainer.appendChild(square);
        }
    }

    createLines() {
        const numberOfLines = 15;
        
        for (let i = 0; i < numberOfLines; i++) {
            const line = document.createElement('div');
            line.className = 'line';
            
            const width = Math.random() * 200 + 100;
            const height = 1;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            
            line.style.cssText = `
                width: ${width}px;
                height: ${height}px;
                left: ${startX}px;
                top: ${startY}px;
                opacity: ${Math.random() * 0.5 + 0.1};
            `;
            
            this.lines.push({
                element: line,
                x: startX,
                y: startY,
                length: width,
                angle: Math.random() * 360,
                speed: Math.random() * 2 - 1
            });
            
            this.linesContainer.appendChild(line);
        }
    }

    createParticles() {
        const numberOfParticles = 50;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 5 + 1;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${startX}px;
                top: ${startY}px;
                opacity: ${Math.random() * 0.5 + 0.5};
            `;
            
            this.particles.push({
                element: particle,
                x: startX,
                y: startY,
                size: size,
                speedX: (Math.random() - 0.5) * 3,
                speedY: (Math.random() - 0.5) * 3
            });
            
            this.particlesContainer.appendChild(particle);
        }
    }

    animate() {
        this.animateSquares();
        this.animateLines();
        this.animateParticles();
        this.drawMatrixEffect();
        requestAnimationFrame(() => this.animate());
    }

    animateSquares() {
        this.squares.forEach(square => {
            square.x += square.speedX;
            square.y += square.speedY;
            square.rotation += square.rotationSpeed;

            if (square.x < -square.size) square.x = window.innerWidth + square.size;
            if (square.x > window.innerWidth + square.size) square.x = -square.size;
            if (square.y < -square.size) square.y = window.innerHeight + square.size;
            if (square.y > window.innerHeight + square.size) square.y = -square.size;

            square.element.style.transform = `translate(${square.x}px, ${square.y}px) rotate(${square.rotation}deg)`;
        });
    }

    animateLines() {
        this.lines.forEach(line => {
            line.angle += line.speed;
            line.x += Math.cos(line.angle * Math.PI / 180) * 2;
            line.y += Math.sin(line.angle * Math.PI / 180) * 2;

            if (line.x < -line.length) line.x = window.innerWidth + line.length;
            if (line.x > window.innerWidth + line.length) line.x = -line.length;
            if (line.y < -line.length) line.y = window.innerHeight + line.length;
            if (line.y > window.innerHeight + line.length) line.y = -line.length;

            line.element.style.transform = `translate(${line.x}px, ${line.y}px) rotate(${line.angle}deg)`;
        });
    }

    animateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < -particle.size) particle.x = window.innerWidth + particle.size;
            if (particle.x > window.innerWidth + particle.size) particle.x = -particle.size;
            if (particle.y < -particle.size) particle.y = window.innerHeight + particle.size;
            if (particle.y > window.innerHeight + particle.size) particle.y = -particle.size;

            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        });
    }

    drawMatrixEffect() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.matrixCanvas.width, this.matrixCanvas.height);

        this.ctx.fillStyle = '#0fa';
        this.ctx.font = '15px monospace';

        for (let i = 0; i < this.matrixChars.length; i++) {
            const y = this.matrixChars[i] * 20;
            const text = String.fromCharCode(Math.random() * 128);
            this.ctx.fillText(text, i * 20, y);

            if (y > this.matrixCanvas.height && Math.random() > 0.975) {
                this.matrixChars[i] = 0;
            }
            this.matrixChars[i]++;
        }
    }

    handleResize() {
        this.matrixCanvas.width = window.innerWidth;
        this.matrixCanvas.height = window.innerHeight;
        this.setupMatrixEffect();
    }
}

class FormAnimations {
    constructor() {
        this.form = document.querySelector('.login-form');
        this.inputs = document.querySelectorAll('.input-group input');
        this.loginBtn = document.querySelector('.login-btn');
        this.init();
    }

    init() {
        this.addInputAnimations();
        this.addButtonAnimations();
        this.addFormSubmitAnimation();
    }

    addInputAnimations() {
        this.inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    addButtonAnimations() {
        this.loginBtn.addEventListener('mouseover', () => {
            this.loginBtn.style.transform = 'scale(1.05)';
        });

        this.loginBtn.addEventListener('mouseout', () => {
            this.loginBtn.style.transform = 'scale(1)';
        });
    }

    addFormSubmitAnimation() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            this.loginBtn.classList.add('loading');
            
            setTimeout(() => {
                this.loginBtn.classList.remove('loading');
                this.loginBtn.classList.add('success');
                
                setTimeout(() => {
                    this.loginBtn.classList.remove('success');
                }, 1500);
            }, 1500);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TechBackground();
    new FormAnimations();
});

