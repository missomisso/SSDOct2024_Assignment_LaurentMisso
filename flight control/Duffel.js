import { Duffel } from '@duffel/api'

const duffel = new Duffel({
  token: process.env.DUFFEL_API,
})

const aircraft = await duffel.aircraft.get('arc_00009VMF8AhXSSRnQDI6Hi')
console.log(aircraft)