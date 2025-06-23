<template>
  <section id="home" class="bg-white lg:grid lg:h-screen lg:place-content-center">
    <div
      class="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32"
    >
      <!-- Texto -->
      <div class="max-w-prose text-left">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl">
          Impulsa tu negocio con
          <strong class="text-indigo-600"> soluciones digitales </strong>
          a medida
        </h1>

        <p class="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
          Somos una empresa especializada en desarrollo de software personalizado. Transformamos ideas en aplicaciones funcionales, seguras y escalables. Desde sitios web hasta sistemas empresariales, ¡nos encargamos de todo!
        </p>

        <div class="mt-4 flex gap-4 sm:mt-6">
          <a href="#contact"
            class="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Contáctanos
          </a>

          <a
            class="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            href="#features"
          >
            Conoce más
          </a>
        </div>
      </div>

      <div class="mt-8 md:mt-0">
        <img
          src="https://img.freepik.com/vector-premium/desarrollo-software-programacion-codificacion-concepto-vector_123447-266.jpg"
          alt="Desarrolladores trabajando en código"
          class="mx-auto max-w-md"
        />
      </div>
    </div>
  </section>
</template>
