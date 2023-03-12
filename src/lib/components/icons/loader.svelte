<g fill="none" stroke-width="20" stroke-linecap="round" stroke-linejoin="round">
  <path d="M 120,20 A 100,100 270,1,0 220,120" class="loader" />
</g>

<style lang="scss">
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .loader {
    transform-origin: 50%;
    animation: loader 1s linear infinite;
  }
</style>
