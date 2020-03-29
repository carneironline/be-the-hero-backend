import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'

import styles from './styles'
import logoImg from '../../assets/images/logo.png'

export default function Incidents() {
    const [incidents, setIncidents] = React.useState([])
    const [totalIncidents, setTotalIncidents] = React.useState(0)
    const [page, setPage] = React.useState(1)
    const [loading, setLoading] = React.useState(false)
    const navigation = useNavigation()

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    async function loadIncidents() {
        if (
            loading ||
            (totalIncidents > 0 && incidents.length === totalIncidents)
        )
            return

        setLoading(true)

        try {
            const response = await api.get('incidents', {
                params: { page },
            })

            setIncidents([...incidents, ...response.data])
            setTotalIncidents(response.headers['x-total-count'])
            setPage(page + 1)
        } catch (error) {
            alert('Ops! Algo não deu certo :( Tente novamente')
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de{' '}
                    <Text style={styles.headerTextBold}>
                        {totalIncidents} caso{totalIncidents > 1 && 's'}
                    </Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem Vindo </Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia
            </Text>

            <FlatList
                style={styles.incidentList}
                showsVerticalScrollIndicator={false}
                data={incidents}
                keyExtractor={(incident) => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>Ong:</Text>
                        <Text style={styles.incidentValue}>
                            {incident.name}
                        </Text>

                        <Text style={styles.incidentProperty}>Caso:</Text>
                        <Text style={styles.incidentValue}>
                            {incident.title}
                        </Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>
                                Ver mais detalhes
                            </Text>
                            <Feather
                                name='arrow-right'
                                size={16}
                                color='#e02041'
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}
