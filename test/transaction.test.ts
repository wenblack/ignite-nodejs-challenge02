import { afterAll, beforeAll, beforeEach, it, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
})

beforeEach(async () => {
  execSync('npx prisma migrate dev')
})

describe('User Route', () => {
  it('must be possible to create a user', async () => {
    await request(app.server)
      .post('/user')
      .send({
        email: 'test@example.com',
      })
      .expect(201)
  })
})
describe('Meals Routes', () => {
  it('User should be able to list all transactions', async () => {
    const user = await request(app.server)
      .post('/user')
      .send({
        email: 'test2@example.com',
      })
      .expect(201)

    const cookies = user.get(`Set-Cookie`)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Test meal',
        description: 'This is a meal test',
        isOnTheDiet: true,
      })
      .expect(201)
    const response = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    expect(response.body.meals).toEqual([
      expect.objectContaining({
        name: 'Test meal',
        description: 'This is a meal test',
        isOnTheDiet: true,
      }),
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const user = await request(app.server)
      .post('/user')
      .send({
        email: 'test3@example.com',
      })
      .expect(201)

    const cookies = user.get(`Set-Cookie`)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Test meal',
        description: 'This is a meal test',
        isOnTheDiet: true,
      })
      .expect(201)

    const listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies)
      .expect(200)

    const mealID = listMealsResponse.body.meals[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/meals/${mealID}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransactionResponse.body.meal).toEqual(
      expect.objectContaining({
        name: 'Test meal',
        description: 'This is a meal test',
        isOnTheDiet: true,
      }),
    )
  })
})

describe('Summary Routes', () => {
  it('User should be able to get the summary', async () => {
    const user = await request(app.server)
      .post('/user')
      .send({
        email: 'test4@example.com',
      })
      .expect(201)

    const cookies = user.get(`Set-Cookie`)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Test meal',
        description: 'This is a meal test',
        isOnTheDiet: true,
      })
      .expect(201)

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies)
      .send({
        name: 'Test meal 2',
        description: 'This is a meal test',
        isOnTheDiet: true,
      })
      .expect(201)

    const response = await request(app.server)
      .get('/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(response.body.summary).toEqual(
      expect.objectContaining({
        totalMeals: 2,
        healthMeals: 2,
        junkMeals: 0,
        healthFoodStreak: 2,
      }),
    )
  })
})
