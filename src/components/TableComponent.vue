<template>
  <section class="bg-gray-50 p-3">
    <div class=" mx-auto">
      <div class="bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden">
        <!-- Header -->
        <header class="bg-gradient-to-r from-blue-800 to-blue-700 px-6 py-5">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-white">{{ title }}</h2>
            <div class="flex items-center space-x-3">
              <span class="text-white text-sm">{{ filteredRows.length }} registros</span>
            </div>
          </div>
        </header>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center py-16">
          <div class="relative">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-600"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-3 h-3 bg-slate-600 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <!-- Table Content -->
        <div v-else class="overflow-hidden">

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th
                    v-for="(header, index) in headers"
                    :key="index"
                    class="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors duration-200 select-none"
                    :class="header.align === 'center' ? 'text-center' : 'text-left'"
                    @click="toggleSort(header.key)"
                  >
                    <div class="flex items-center space-x-2">
                      <span>{{ header.label }}</span>
                      <div class="flex flex-col">
                        <ChevronUp
                          class="w-3 h-3 -mb-1"
                          :class="sortConfig.key === header.key && sortConfig.direction === 'asc' ? 'text-slate-600' : 'text-gray-300'"
                        />
                        <ChevronDown
                          class="w-3 h-3"
                          :class="sortConfig.key === header.key && sortConfig.direction === 'desc' ? 'text-slate-600' : 'text-gray-300'"
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-100">
                <!-- Empty State -->
                <tr v-if="filteredRows.length === 0">
                  <td :colspan="headers.length" class="px-6 py-12 text-center">
                    <div class="flex flex-col items-center space-y-3">
                      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <Search class="w-8 h-8 text-gray-400" />
                      </div>
                      <div class="text-gray-500">
                        <p class="font-medium">No se encontraron resultados</p>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- Data Rows -->
                <tr
                  v-for="(row, rowIndex) in paginatedRows"
                  :key="rowIndex"
                  class="hover:bg-slate-50 transition-colors duration-150"
                >
                  <td
                    v-for="(header, colIndex) in headers"
                    :key="colIndex"
                    class="px-6 py-4 whitespace-nowrap"
                    :class="header.align === 'center' ? 'text-center' : 'text-left'"
                  >
                    <div class="text-sm text-gray-900 font-medium" v-html="row[header.key]"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="filteredRows.length > itemsPerPage" class="bg-white px-6 py-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700">
                Mostrando {{ startIndex + 1 }} a {{ Math.min(endIndex, filteredRows.length) }} de {{ filteredRows.length }} resultados
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronLeft class="w-4 h-4" />
                </button>

                <div class="flex space-x-1">
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="currentPage = page"
                    class="px-3 py-2 border rounded-md text-sm font-medium transition-colors duration-200"
                    :class="page === currentPage
                      ? 'bg-slate-600 text-white border-slate-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
                  >
                    {{ page }}
                  </button>
                </div>

                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronRight class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-vue-next'

interface Header {
  label: string
  key: string
  align?: 'left' | 'center'
}

interface Props {
  title: string
  headers: Header[]
  rows: Array<Record<string, string | number>>
  loading?: boolean
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  itemsPerPage: 10
})

const columnFilters = ref<Record<string, string>>({})
const sortConfig = ref<{ key: string; direction: 'asc' | 'desc' | null }>({
  key: '',
  direction: null
})
const currentPage = ref(1)

watch(() => props.headers, (newHeaders) => {
  newHeaders.forEach(header => {
    if (!(header.key in columnFilters.value)) {
      columnFilters.value[header.key] = ''
    }
  })
}, { immediate: true })


const filteredRows = computed(() => {
  let filtered = [...props.rows]

  Object.entries(columnFilters.value).forEach(([key, filterValue]) => {
    if (filterValue.trim()) {
      filtered = filtered.filter(row => {
        const cellValue = String(row[key] || '').toLowerCase()
        return cellValue.includes(filterValue.toLowerCase())
      })
    }
  })

  if (sortConfig.value.key && sortConfig.value.direction) {
    filtered.sort((a, b) => {
      const aVal = String(a[sortConfig.value.key] || '')
      const bVal = String(b[sortConfig.value.key] || '')

      const comparison = aVal.localeCompare(bVal, undefined, { numeric: true })
      return sortConfig.value.direction === 'asc' ? comparison : -comparison
    })
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredRows.value.length / props.itemsPerPage))

const startIndex = computed(() => (currentPage.value - 1) * props.itemsPerPage)
const endIndex = computed(() => startIndex.value + props.itemsPerPage)

const paginatedRows = computed(() => {
  return filteredRows.value.slice(startIndex.value, endIndex.value)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const toggleSort = (key: string) => {
  if (sortConfig.value.key === key) {
    if (sortConfig.value.direction === 'asc') {
      sortConfig.value.direction = 'desc'
    } else if (sortConfig.value.direction === 'desc') {
      sortConfig.value.direction = null
      sortConfig.value.key = ''
    } else {
      sortConfig.value.direction = 'asc'
    }
  } else {
    sortConfig.value.key = key
    sortConfig.value.direction = 'asc'
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

watch([columnFilters, sortConfig], () => {
  currentPage.value = 1
}, { deep: true })
</script>
