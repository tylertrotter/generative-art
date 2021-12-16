<template>
  <svg :viewBox="`0 0 ${width} ${height}`">
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" :stdDeviation="randomNumber(0, 70)" />
    </filter>
    <filter id="blur2">
      <feGaussianBlur in="SourceGraphic" :stdDeviation="randomNumber(0, 70)" />
    </filter>
    <filter id="blur3">
      <feGaussianBlur in="SourceGraphic" :stdDeviation="randomNumber(0, 20)" />
    </filter>

    <filter id="displacementFilter1">
      <feTurbulence 
        type="turbulence" 
        baseFrequency=".05"
        numOctaves="2"
        result="turbulence"
      />
      <feDisplacementMap 
        in2="turbulence" in="SourceGraphic"
        :scale="randomNumber(0, 30)"
        xChannelSelector="R" 
        yChannelSelector="G"
      />
    </filter>
    <filter id="displacementFilter2">
      <feTurbulence 
        type="turbulence" 
        baseFrequency=".05"
        numOctaves="2"
        result="turbulence"
      />
      <feDisplacementMap 
        in2="turbulence" in="SourceGraphic"
        :scale="randomNumber(0, 30)"
        xChannelSelector="R" 
        yChannelSelector="G"
      />
    </filter>

    <rect x="0" y="0" :width="width" :height="height" fill="white" />

    <g class="background" v-if="randomNumber(0, 15)" :style="randomNumber(0, 5) ? 'filter: url(#blur)' : null">
      <template v-if="randomNumber(0, 1)">
        <rect 
          v-for="shape in randomNumber(0, 15)" 
          :key="shape"
          :x="randomNumber(width*-1, width)" 
          :y="randomNumber(width*-1, width)" 
          :width="randomNumber(width, width * 3)" 
          :height="randomNumber(width, width * 3)" 
          :fill="getColor()"
        />
      </template>
      <template v-else>
        <circle 
          v-for="shape in randomNumber(0, 15)" 
          :key="shape"
          :cx="randomNumber(width*-1, width)" 
          :cy="randomNumber(width*-1, width)" 
          :r="randomNumber(0, width)" 
          :fill="getColor()"
        />
      </template>
    </g>

    <g class="foreground" :transform="`rotate(${randomNumber(1, 360)})`" :style="randomNumber(0, 5) ? 'filter: url(#blur2)' : null">
      <rect 
          v-for="shape in randomNumber(0, 5)" 
          :key="shape"
          :x="randomNumber(width*-.5, width*.5)" 
          :y="randomNumber(width*-.5, width*.5)" 
          :width="randomNumber(0, width/2)" 
          :height="randomNumber(0, width/2)" 
          :fill="getColor()"
        />
        <circle 
          v-for="shape in randomNumber(0, 5)" 
          :key="shape"
          :cx="randomNumber(width*-.5, width*.5)" 
          :cy="randomNumber(width*-.5, width*.5)" 
          :r="randomNumber(0, width/3)" 
          :fill="getColor()"
        />
    </g>
    <g>
      <path
          v-for="path in randomNumber(0, 5)" 
          :key="path"
          :stroke="getColor()"
          :stroke-width="randomNumber(1,width/6)"
          fill="transparent"
          :d="randomDraw()"
          :style="`filter: url(#displacementFilter${this.randomNumber(1,2)})`"
          :transform="`rotate(${randomNumber(1, 360)})`"
        />
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'GDesign',
    data() {
      return {
        width: 120,
        height: 120,
        hasBg: null,
        pallet: null
      }
    },
    created() {
      this.createPallet();      
    },
    methods: { 
      randomNumber(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
      },
      randomColor() {
        // possible parameters: complimentary:color, analogous:color, dark, light
        return `hsl(${this.randomNumber(0, 360)}, ${this.randomNumber(0, 100)}%, ${this.randomNumber(0, 100)}%)`;
      },
      randomDraw() {
        return `M ${this.randomNumber(-this.width,this.width)},${this.randomNumber(-this.height,this.height)}
          ${this.randomNumber(0,1) ? 'c' : 'l'} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)}
          ${this.randomNumber(0,1) ? 'c' : 'l'} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)}
          ${this.randomNumber(0,1) ? 'c' : 'l'} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)}
          ${this.randomNumber(0,1) ? 'c' : 'l'} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)} ${this.randomNumber(1,this.width)},${this.randomNumber(1,this.width)}`;
      },
      createPallet() {
        const numColors = this.randomNumber(2, 10);
        const colors = [];
        for(let i = 0; i < numColors; i++)
          colors.push(this.randomColor());

        this.pallet =  colors;
      },
      getColor() {
        return this.pallet[this.randomNumber(0, this.pallet.length - 1)]
      }
      // randomShape: rect, circle, polygon
      // randomPath
    }
  }
</script>

<style scoped>
  svg * {
    transform-origin: center;
  }
</style>