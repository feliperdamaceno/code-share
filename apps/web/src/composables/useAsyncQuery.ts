import { computed, ref, shallowRef } from 'vue'

/**
 * Fetch data asynchronous by a given query callback.
 * @param {String} name - Query name (used to cache)
 * @param {Function} query - Async callback to fetch data
 * @param {Object} options - Accepts a `revalidate` value in milliseconds. It is used as interval to refresh the query.
 */
export function useAsyncQuery<T>(
  name: string,
  query: () => Promise<[T, null] | [null, Error]>,
  options: { revalidate: number } = { revalidate: 60_000 /* 60 sec */ }
) {
  /* state */
  const dataMap = ref<Map<string, T | null>>(new Map())
  const loading = shallowRef<boolean>(false)
  const error = shallowRef<Error | null>(null)

  /* getters */
  const data = computed(() => {
    return dataMap.value.get(name) as T
  })

  /* actions */
  async function load() {
    if (dataMap.value.has(name)) {
      if (revalidate()) {
        await fetch()
        timestamp.value = Date.now()
      }

      return dataMap.value.get(name) as T
    }

    await fetch()
    timestamp.value = Date.now()
    return dataMap.value.get(name) as T
  }

  /* private: state */
  const timestamp = shallowRef(Date.now())

  /* private: actions */
  function revalidate() {
    const elapsed = Date.now() - timestamp.value
    return elapsed > options.revalidate
  }

  async function fetch() {
    loading.value = true
    const [response, err] = await query()
    loading.value = false

    if (err !== null) {
      return (error.value = err)
    }

    dataMap.value.set(name, ref(response).value)
  }

  return { data, loading, error, load }
}
