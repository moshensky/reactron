export type LoadableLoading = Readonly<{
  status: 'loading'
}>

export type LoadableUpdatingOrLoaded<T> = Readonly<{
  status: 'updating' | 'loaded'
  item: T
}>

export type LoadableFailure<T> = Readonly<{
  status: 'failure'
  failure: T
}>

export type Loadable<Item, Failure> =
  | LoadableLoading
  | LoadableUpdatingOrLoaded<Item>
  | LoadableFailure<Failure>

type LoadableFoldFn<Item, Failure, RFailure, RLoading, RLoaded, RUpdating> = {
  failure: (failure: Failure) => RFailure
  loading: () => RLoading
  loaded: (item: Item) => RLoaded
  updating: (item: Item) => RUpdating
}

export const Loadable = {
  fold<Item, Failure, RFailure, RLoading, RLoaded, RUpdating>(
    loadable: Loadable<Item, Failure>,
    f: LoadableFoldFn<Item, Failure, RFailure, RLoading, RLoaded, RUpdating>,
  ): RFailure | RLoading | RLoaded | RUpdating {
    switch (loadable.status) {
      case 'failure':
        return f.failure(loadable.failure)
      case 'loading':
        return f.loading()
      case 'loaded':
        return f.loaded(loadable.item)
      case 'updating': {
        return f.updating(loadable.item)
      }
    }
  },
  map<Item, Failure, R>(
    fn: (item: Item) => R,
    loadable: Loadable<Item, Failure>,
  ): Loadable<R, Failure> {
    switch (loadable.status) {
      case 'loading':
      case 'failure':
        return loadable
      case 'loaded': {
        return {
          status: 'loaded',
          item: fn(loadable.item),
        }
      }
      case 'updating': {
        return {
          status: 'updating',
          item: fn(loadable.item),
        }
      }
    }
  },
  ofFailure<Failure>(failure: Failure): LoadableFailure<Failure> {
    return { status: 'failure', failure }
  },
  ofLoading(): LoadableLoading {
    return { status: 'loading' }
  },
  ofUpdating<T>(item: T): LoadableUpdatingOrLoaded<T> {
    return { status: 'updating', item }
  },
  ofLoaded<T>(item: T): LoadableUpdatingOrLoaded<T> {
    return { status: 'loaded', item }
  },
  isLoadedOrUpdating<Item, Failure>(
    item: Loadable<Item, Failure>,
  ): item is LoadableUpdatingOrLoaded<Item> {
    return item.status === 'loaded' || item.status === 'updating'
  },
  isLoaded<Item, Failure>(item: Loadable<Item, Failure>): item is LoadableUpdatingOrLoaded<Item> {
    return item.status === 'loaded'
  },
  isUpdating<Item, Failure>(item: Loadable<Item, Failure>): item is LoadableUpdatingOrLoaded<Item> {
    return item.status === 'updating'
  },
  isLoading<Item, Failure>(item: Loadable<Item, Failure>): item is LoadableLoading {
    return item.status === 'loading'
  },
  isFailure<Item, Failure>(item: Loadable<Item, Failure>): item is LoadableFailure<Failure> {
    return item.status === 'failure'
  },
  isLoadingOrUpdating<Item, Failure>(
    item: Loadable<Item, Failure>,
  ): item is LoadableLoading | LoadableUpdatingOrLoaded<Item> {
    return item.status === 'loading' || item.status === 'updating'
  },
}
