import { gql } from "@apollo/client"

export const REORDER_SCALES = gql`
  mutation reorderScale($scaleOrder: [String]!) {
    reorderScales(
      scaleOrder: $scaleOrder
    ) {
      scaleOrder
    }
  }

`
