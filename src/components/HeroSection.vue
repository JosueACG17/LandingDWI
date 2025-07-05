<template>
  <section id="home" class="bg-white">
    <div
      class="mx-auto mt-10 max-w-screen-xl px-4 py-16 sm:px-6 lg:grid lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-32"
    >
      <!-- Texto -->
      <div class="text-center md:text-left">
        <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl md:text-5xl">
          Impulsa tu negocio con
          <strong class="text-indigo-600">soluciones digitales</strong>
          a medida
        </h1>

        <p class="mt-4 text-base text-gray-700 sm:text-lg md:text-pretty">
          Somos una empresa especializada en desarrollo de software personalizado. Transformamos ideas en aplicaciones funcionales, seguras y escalables. Desde sitios web hasta sistemas empresariales, ¡nos encargamos de todo!
        </p>

        <div class="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
          <a
            href="#contact"
            class="w-full sm:w-auto inline-block rounded border border-indigo-600 bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700 text-center"
          >
            Contáctanos
          </a>
          <a
            href="#features"
            class="w-full sm:w-auto inline-block rounded border border-gray-200 px-6 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 text-center"
          >
            Conoce más
          </a>
        </div>
      </div>

      <!-- Imagen -->
      <div class="mt-10 lg:mt-0">
        <img
          src="https://img.freepik.com/vector-premium/desarrollo-software-programacion-codificacion-concepto-vector_123447-266.jpg"
          alt="Desarrolladores trabajando en código"
          class="mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
        />
      </div>
    </div>
  </section>
</template>
