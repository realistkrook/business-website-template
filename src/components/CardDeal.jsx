import React from 'react'
import { card } from '../assets'
import Button from './Button'
import styles, { layout } from '../style'

const CardDeal = () => {
  return (
    <section className={layout.section}>
      <div className={layout.sectionInfo}>
        <h2 className={styles.heading2}>Why choose us?
<br className='sm:block hidden'/></h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Unlike other web design companies, we believe in quality web design without the hefty fee. 
        While other companies charge thousands of dollars, our fees are fractional compared to theirs, while still offering quality and service. This is why you should choose realistsTech.

        </p>
        <Button styles='mt-10'/>
      </div>
      <div className={layout.sectionImg}>
        <img
          src={card}
          alt='card'
          className='w-[100%] h-[100%]'
        />
      </div>
    </section>
  )
}

export default CardDeal
