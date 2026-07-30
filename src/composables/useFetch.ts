import { ref, type Ref } from 'vue'

export function useFetch<T>(fetcherFn: () => Promise<T>) {
  const data = ref<T | null>(null) as Ref<T | null>
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const execute = async () => {
    isLoading.value = true
    error.value = null
    try {
      data.value = await fetcherFn()
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Error loading data'
    } finally {
      isLoading.value = false
    }
  }

  execute()

  return { data, isLoading, error, refetch: execute }
}
