import memoizeOne from 'memoize-one';
import React, { memo, FC } from 'react'
import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'

const ANIMATION_SPEED = 2
const BAR_NUMBER = 4
const bars: number[] = []
for (let i = 0; i < BAR_NUMBER; i++) {
  bars.push(i)
}

const getBounce = memoizeOne(
  (moveDistance: number) => keyframes`
  0% {
    transform: translate(0px,0px);
  }
  50% {
    transform: translate(0px,${moveDistance}px);
  }
  100% {
    transform: translate(0px,0px);
  }
`,
)

type BarProps = {
  order: number
  moveDistance: number
  speed: number
  type: LoaderType
}

const Bar = styled('rect')<BarProps>`
  animation: ${({ moveDistance }: BarProps) => getBounce(moveDistance)} ${({ speed }) => speed}s
  infinite;
  animation-delay: ${({ order, speed }) => order * (speed / 1.3 / BAR_NUMBER) - speed * 0.6}s;
  fill: white;
  will-change: transform;
`

type LoaderType = 'primary' | 'secondary'

type Props = {
  size: number | string
  type?: LoaderType
  seperation?: number
  speed?: number
}

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const AdaptiveLoader: FC<Props> = React.memo(
  ({ size, type, seperation, speed, children }) => {
    const sizeNum = Number(size)
    const barHeight = sizeNum * 0.75
    const barWidth = barHeight / 4
    const seperationDistance = (seperation !== undefined ? seperation : sizeNum / 25) - 0.5
    const moveDistance = barHeight / 3
    const totalBarWidth = barWidth * BAR_NUMBER + seperationDistance * (BAR_NUMBER - 1)
    const extraWidth = sizeNum - totalBarWidth

    return (
      <svg width={sizeNum} height={sizeNum} data-qa="adaptive-loader__svg">
        {bars.map((item, i) => (
          <Bar
            type={type || 'primary'}
            key={i}
            height={barHeight}
            width={barWidth}
            x={extraWidth / 2 + i * (barWidth + seperationDistance)}
            order={i}
            moveDistance={moveDistance}
            speed={speed || ANIMATION_SPEED}
          />
        ))}
        {children}
      </svg>
    )
  },
)

type LoaderProps = Props & { className?: string };

export const Loader = memo<LoaderProps>(({ className, ...props }) => (
  <LoadingContainer className={className}>
    <AdaptiveLoader {...props} />
  </LoadingContainer>
));
