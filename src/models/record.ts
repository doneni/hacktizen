export interface Record {
    index: number
    nickname: string
    content: string
    solved?: string[]
    date: string
}

export interface Records {
    records: Record[]
  }