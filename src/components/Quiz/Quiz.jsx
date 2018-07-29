import React, { Component } from 'react';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// actions
import { listQuiz } from '../../redux/actions/quizActions';
// operator
import If from '../Operator/If';
// components
import Question from './Question';

class Quiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: false,
            finish: false,
            counter: 0,
            question: {},
            highScore: 0,
        };
    }

    componentWillMount = () => {
        // buscar do banco de dados...
        const quizExample = [
            {
                description: "Qual é o resultado da soma de 2+2+5?",
                asset: "",
                alternatives: [
                    "10",
                    "8",
                    "9",
                    "7",
                    "12"
                ],
                correct: "9",
            },
            {
                description: "A ausência de ferro pode provocar uma doença chamada anemia ferropriva?",
                asset: "",
                alternatives: [
                    "Verdadeiro",
                    "Falso",
                ],
                correct: "Verdadeiro",
            },
            {
                description: "Goiânia é a capital de qual estado brasileiro?",
                asset: "",
                alternatives: [
                    "Mato Grosso",
                    "Santa Catarina",
                    "Distrito Federal",
                    "Acre",
                    "Nenhuma das alternativas",
                ],
                correct: "Nenhuma das alternativas",
            },
            {
                description: "Como é é escrito 'Bom dia!' em inglês?",
                asset: "",
                alternatives: [
                    "God morning!",
                    "Good morning!",
                    "Good morneing!",
                    "God morninng!",
                    "Nenhuma das alternativas",
                ],
                correct: "Good morning!",
            },
        ];
        this.props.listQuiz(quizExample);
    }

    componentDidUpdate = () => {
        if (!this.state.start) {
            this.setInitializeQuiz();
        }
    }

    setInitializeQuiz = () => {
        const { quiz } = this.props.quiz;
        const { counter } = this.state;

        this.setState({
            start: true,
            question: quiz[counter],
        });
    }

    setNextQuestion = () => {
        const { quiz } = this.props.quiz;
        let { counter } = this.state;
        counter = counter + 1;

        this.setState({
            counter: counter,
            question: quiz[counter],
        });
    }

    checkQuiz = () => {
        const { quiz } = this.props.quiz;
        let { counter } = this.state;

        if (quiz.length === counter + 1) {
            this.setState({
                finish: true,
            });
        } else {
            this.setNextQuestion();
        }
    }

    setAlternative = (correct, alternative) => {
        let { highScore } = this.state;

        if (correct === alternative) {
            highScore = highScore + 1;
            this.setState({
                highScore: highScore,
            });
        }
        this.checkQuiz();
    }

    render() {
        const { finish, question, counter } = this.state;
        console.log(this.state);
        return (
            <div>
                <h2>Quiz (Teste)</h2>
                <If test={!finish}>
                    <If test={question !== {}}>
                        <div>
                            <Question question={question} counter={counter} setAlternative={this.setAlternative} />
                        </div>
                    </If>
                </If>
                <If test={finish}>
                    <p>FIM DE JOGO! Sua pountuação foi {this.state.highScore}</p>
                </If>
            </div>
        );
    }
}

const mapStateToProps = state => ({ quiz: state.quiz });
const mapDispatchToProps = dispatch => bindActionCreators({ listQuiz }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);