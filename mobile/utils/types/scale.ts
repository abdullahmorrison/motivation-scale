export type ScaleData = {
  id: string
  goal: string
  sliderValue: number,
  chasingSuccessDescription?: string
  avoidingFailureDescription?: string
}

export type ScaleInput = Omit<ScaleData, 'id' | 'sliderValue'>

export const emptyScaleInput: ScaleInput = {
  goal: '', 
  chasingSuccessDescription: '', 
  avoidingFailureDescription: ''
}

export type AddScale = {
  type: 'add'
}
export type EditScale = {
  type: 'edit'
  scale: ScaleData
}

type BaseScaleModalActions = {
  onClose: () => void
}
type AddScaleActions = BaseScaleModalActions & {
  onAdd: (scaleData: ScaleInput) => void
} 
type EditScaleActions = BaseScaleModalActions & {
  onEdit: (scaleData: ScaleInput) => void
  onDelete: (id: string) => void
}

type AddScaleProps = AddScale & AddScaleActions
type EditScaleProps = EditScale & EditScaleActions

export type ScaleModalProps = AddScaleProps | EditScaleProps
