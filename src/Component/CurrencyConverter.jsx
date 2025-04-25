import React, { useState, useEffect } from 'react'
import InputBox from './InputBox'
import useCurrencyInfo from '../Hooks/NesHooks'

const allCurrencyCodes = [
  "USD", "EUR", "GBP", "INR", "AUD", "CAD", "CHF", "CNY", "JPY", "NZD",
  "ZAR", "SGD", "HKD", "SEK", "KRW", "NOK", "MXN", "BRL", "RUB", "TRY",
  "DKK", "PLN", "TWD", "THB", "MYR", "IDR", "CZK", "HUF", "ILS", "CLP",
  "PHP", "AED", "COP", "SAR", "RON"
]

function CurrencyConverter() {
    const [amount, setAmount] = useState(1)
    const [from, setFrom] = useState("USD")
    const [to, setTo] = useState("INR")
    const [convertedAmount, setConvertedAmount] = useState(0)

    const { data: currencyInfo, error } = useCurrencyInfo(from)
    const options = allCurrencyCodes

    const swap = () => {
        setFrom(to)
        setTo(from)
        setConvertedAmount(amount)
        setAmount(convertedAmount)
    }

    const convert = () => {
        if (currencyInfo && currencyInfo[from] && currencyInfo[to]) {
            const rate = currencyInfo[to] / currencyInfo[from]
            setConvertedAmount(amount * rate)
        } else {
            setConvertedAmount(0)
        }
    }

    useEffect(() => {
        convert()
    }, [amount, from, to, currencyInfo])


    return (
        <div className="converter-container">
            <div className="converter-box">
                <div className="input-row">
                    <h2 className="converter-title">Currency Converter</h2>
                </div>
                
                <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={setFrom}
                    selectCurrency={from}
                    onAmountChange={setAmount}
                />
                
                <div className="swap-button-container">
                    <button className="swap-button" onClick={swap}>
                        ↑↓
                    </button>
                </div>
                
                <InputBox
                    label="To"
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={setTo}
                    selectCurrency={to}
                    amountDisable={true}
                />
                
                <button 
                    className="convert-btn"
                    onClick={convert}
                >
                    Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>
            </div>
        </div>
    )
}

export default CurrencyConverter
