export const BACKEND_URL = "http://localhost:8000"

export interface Images {
  gcc: string;
  tq: string;
  tq_with_vlines: string;
  tq_merged: string;
  tq_merged_with_vlines: string;
  tq_separated: string;
  tq_separated_with_vlines: string;
  tq_split: string;
  tq_split_with_vlines: string;
}

export interface Range {
  min: number;
  max: number;
}

export interface State {
  isValidated: boolean;
  streams: Stream[];
}

export interface Stream {
  id: string;
  inputTemperature: number | '';
  outputTemperature: number | '';
  heatLoad: number | '';
  type: number | '';
  state: number | '';
  cost: number | '';
  reboilerOrReactor: boolean;
}

const isHot = (stream: Stream) => {
  return stream.type === 2 || stream.type === 4
}

const isCold = (stream: Stream) => {
  return stream.type === 1 || stream.type === 3
}

const isExternal = (stream: Stream) => {
  return stream.type === 3 || stream.type === 4
}

export interface PropertyError {
  property: string;
  message: string;
}

export const isEmpty = (stream: Stream) => {
  const errors: PropertyError[] = []

  if (stream.id === '') {
    errors.push({ property: 'id', message: 'Required.' })
  }
  if (stream.inputTemperature === '') {
    errors.push({ property: 'inputTemperature', message: 'Required.' })
  }
  if (stream.outputTemperature === '') {
    errors.push({ property: 'outputTemperature', message: 'Required.' })
  }
  if (stream.heatLoad === '') {
    errors.push({ property: 'heatLoad', message: 'Required.' })
  }
  if (stream.type === '') {
    errors.push({ property: 'type', message: 'Required.' })
  }
  if (stream.state === '') {
    errors.push({ property: 'state', message: 'Required.' })
  }
  if (stream.cost === '') {
    errors.push({ property: 'cost', message: 'Required.' })
  }

  return errors
}

export const isValid = (stream: Stream) => {
  // If input temp. is lower than output temp., the stream must be Cold/External Cold.
  if (stream.inputTemperature < stream.outputTemperature && isHot(stream)) {
    return {
      message: 'Type must be Cold/External Cold, if input temp. is lower than output temp.',
      fields: ['type', 'inputTemperature', 'outputTemperature'],
    }
  }

  // If input temp. is higher than output temp., the stream must be Hot/External Hot.
  if (stream.inputTemperature > stream.outputTemperature && isCold(stream)) {
    return {
      message: 'Type must be Hot/External Hot, if input temp. is higher than output temp.',
      fields: ['type', 'inputTemperature', 'outputTemperature'],
    }
  }

  // If cost is not zero, the stream must be not external stream.
  if (stream.cost !== 0 && !isExternal(stream)) {
    return {
      message: 'Type must be External Cold/External Hot, if cost is not zero.',
      fields: ['type', 'cost'],
    }
  }

  // If heat load is zero, the stream must be external.
  if (stream.heatLoad === 0 && !isExternal(stream)) {
    return {
      message: 'Type must be External Cold/External Hot, if heat load is zero.',
      fields: ['type', 'heatLoad'],
    }
  }

  // If heat load is not zero, the stream must be internal.
  if (stream.heatLoad !== 0 && isExternal(stream)) {
    return {
      message: 'Type must be Hot/Cold, if heat load is not zero.',
      fields: ['type', 'heatLoad'],
    }
  }

  return undefined
}

export const streamTypes = [
  { value: 1, displayValue: 'Cold' },
  { value: 2, displayValue: 'Hot' },
  { value: 3, displayValue: 'External Cold' },
  { value: 4, displayValue: 'External Hot' },
]

export const streamStates = [
  { value: 1, displayValue: 'Liquid' },
  { value: 2, displayValue: 'Gas' },
  { value: 3, displayValue: 'Liquid Evaporation' },
  { value: 4, displayValue: 'Gas Condensation' },
]
