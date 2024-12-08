import { useEffect, useState } from "react"
import { StyleSheet, View, Text } from "react-native"
import { Dimensions } from "react-native"
import variables from "../styles.variables"

type ScaleState = "Saving What You Can" | "Avoiding Failure" |  "Stagnant" | "Chasing Success" | "Upgrading Goal"

type toolTipProps = {
  sliderValue: number
}
export default function Tooltip({sliderValue}: toolTipProps) {
    const [scaleState, setScaleState] = useState<ScaleState>()
    const [thumbPosition, setThumbPosition] =  useState(50)
    const [tooltipColor, setTooltipColor] = useState({
      red: 160,
      green: 160 
    })
    const [tooltipProperties, setTooltipProperties] = useState({width:0, x: 0})

    useEffect(()=>{
      if(sliderValue>45 && sliderValue <55) setScaleState("Stagnant")
      else if(sliderValue>25 && sliderValue <=45) setScaleState("Avoiding Failure")
      else if(sliderValue <25) setScaleState("Saving What You Can")
      else if(sliderValue>=55 && sliderValue <75) setScaleState("Chasing Success")
      else if(sliderValue>=75) setScaleState("Upgrading Goal")
      
      //convert 0-50 to 0-160
      const convertedNum = sliderValue*3.2
      if(convertedNum<=160) setTooltipColor({ red: 160, green: convertedNum })
      else setTooltipColor({red: 160-(convertedNum%161), green: 160})

      const sliderWidth = Dimensions.get('window').width * 0.9 - 70; // Width of the slider minus paddings

      let position = 0 
      if(sliderValue<=20 && tooltipProperties.x <= -20) position = -30
      else if(sliderValue>=90 && tooltipProperties.x+tooltipProperties.width >= 200) position =200
      else position =((sliderValue / 100) * sliderWidth)-(tooltipProperties.width/2);
      setThumbPosition(position);
    }, [sliderValue, tooltipProperties])

    return (
      <View 
        style={[ styles.tooltip,{ 
          left: thumbPosition, 
          backgroundColor: `rgb(${tooltipColor.red}, ${tooltipColor.green}, 0)`
        }]}
        onLayout={(event) => setTooltipProperties(event.nativeEvent.layout)}
      >
        <Text style={styles.tooltip.text}>{scaleState}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  tooltip: {
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 5,
    padding: 5,
    top: -40,
    zIndex: 1,

    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: variables.textPrimary
    }
  } as const,
})
