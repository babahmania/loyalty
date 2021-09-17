package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

var onlyOnce sync.Once
var dice = []int{1, 2, 3, 4, 5, 6} // array for random dice

//function roller dice
func rollDice() int {
	onlyOnce.Do(func() {
		rand.Seed(time.Now().UnixNano()) // only run once
	})
	return dice[rand.Intn(len(dice))]
}

//get the winner player is
func checkWinner(countPlayer int, playerScore []int) int {
	var winPlayer = 1
	var scoreWinner = 0
	for i := 0; i < countPlayer; i++ {
		if playerScore[i] > scoreWinner {
			scoreWinner = playerScore[i]
			winPlayer = i
		}
	}
	return winPlayer
}

//get next Player
func nextPlayerGetDice(countPlayer int, playerDice []int, posPlayer int) int {
	var n = posPlayer + 1
	var j = 0
	for {
		if j > countPlayer-1 {
			n = 0
			break
		}
		if n > countPlayer-1 {
			n = 0
		}
		if playerDice[n] > 0 {
			break
		}
		j++
		n++
	}
	return n
}

func main() {
	var countPlayer = 3 //variable
	var countDice = 4   //variable count dice each player

	var countPlayerActive = countPlayer
	var roundValue = 1 //var valueDice = 0

	//setting count player have dice = countPlayer
	var playerDice = make([]int, countPlayer)
	var playerScore = make([]int, countPlayer)

	var k = 0
	for i := 0; i < countPlayer; i++ {
		playerDice[i] = countDice //set default have dice each player
		playerScore[i] = 0        //set default score each player
	}

	//game start
	for {
		if k >= countPlayer {
			k = 0
			roundValue++
		}
		fmt.Printf("=====Round No-%v\n", roundValue)
		if countPlayerActive == 1 {
			playerWinner := checkWinner(countPlayer, playerScore)
			fmt.Println("The Winner is Player : ", playerWinner+1)
			break
		}
		/*for break looping
		if roundValue > 17 {
			fmt.Println("game end")
			break
		}
		*/
		if playerDice[k] > 0 {
			valueDice := rollDice()
			fmt.Printf("=====roller player-%v : %v\n", k+1, valueDice)
			if (valueDice) == 6 {
				playerScore[k] = playerScore[k] + 1
			} else {
				if (valueDice) == 1 {
					nextPlayer := nextPlayerGetDice(countPlayer, playerDice, k)
					playerDice[nextPlayer] = playerDice[nextPlayer] + 1
					playerDice[k] = playerDice[k] - 1
					if playerDice[k] == 0 {
						countPlayerActive -= 1
					}
				}
			}
			fmt.Printf("scrore player-%v : %v\n", k+1, playerScore[k])
			fmt.Printf("dice player-%v : %v\n", k+1, playerDice[k])
		}
		fmt.Println("countPlayerActive: ", countPlayerActive)
		k++
	}
}
