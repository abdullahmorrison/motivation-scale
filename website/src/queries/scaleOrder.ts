import { gql } from "@apollo/client"

export const REORDER_SCALES = gql`
  mutation reorderScale($userId: String! $scaleOrder: [String]!) {
    reorderScales(
      userId: $userId
      scaleOrder: $scaleOrder
    ) {
      userId
      scaleOrder
    }
  }

`
