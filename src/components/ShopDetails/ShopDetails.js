import React, { Component } from 'react'
import './styles.css'

class ShopDetails extends Component {
    state = {
        shopData: []
    }

    async componentDidMount() {
        const response = await fetch("http://103.212.121.222:3000/task/1137/report/details/new")
            .then((res) => res.json())

        if (response?.task_answers) {
            this.setShopData(response)
        }
    }

    setShopData = (response) => {
        const taskAns = []
        response.task_answers.map(item => {
            if (item.answer.length === 4)
                taskAns.push(item.answer)

        })
        if (taskAns.length > 0) {
            this.setState({
                shopData: taskAns
            })
        }
    }

    render() {
        const { shopData } = this.state
        let shopInfoTable = null
        let details = null
        if (shopData.length > 0) {
            details =
                shopData.map((item, index) => {
                    const header = item.map(ele => {
                        return (
                            <td key={ele.questionId} className="so-name">
                                {ele.answer}
                            </td>
                        )
                    })
                    return (
                        <tr key={index}>{header}</tr>
                    )
                })
        }
        if (shopData.length > 0) {
            shopInfoTable = (
                <table>
                    <tbody>
                        <tr>
                            <th>Shop Owner Name</th>
                            <th>Shop Owner Number</th>
                            <th>Address of the Shop</th>
                            <th>Image of the Shop</th>
                        </tr>
                        {details}
                    </tbody>
                </table>
            )
        }
        return shopInfoTable
    }
}

export default ShopDetails