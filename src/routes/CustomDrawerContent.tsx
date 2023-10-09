import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useContext } from 'react'
import { AuthContext } from '../context/Auth'

const CustomDrawerContent = (props) => {
    const { signout } = useContext(AuthContext)
    return (
        <DrawerContentScrollView {...props} >
            <DrawerItemList {...props} />
            <DrawerItem label='Sair' onPress={() => signout()} />
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent