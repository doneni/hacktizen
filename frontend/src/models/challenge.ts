export interface Challenge {
  title: string
  region: string
  layer: string
  description: string
  connect: string
}

export interface Challenges {
  challenges: Challenge[]
}

export interface ChallengeFetch {
  title: string
  region: string
  layer: string
  description: string
  connect: string
  solved: boolean
}
