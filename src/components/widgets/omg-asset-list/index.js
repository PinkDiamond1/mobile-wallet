import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { withTheme } from 'react-native-paper'
import { OMGText, OMGEmpty } from 'components/widgets'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Styles } from 'common/utils'
import { BlockchainNetworkType } from 'common/constants'

const OMGAssetList = ({
  theme,
  type,
  style,
  data,
  hasRootchainAssets,
  renderItem,
  refreshControl,
  updatedAt,
  keyExtractor,
  loading,
  handleReload
}) => {
  const getEmptyStatePayload = useCallback(() => {
    if (type === BlockchainNetworkType.TYPE_ETHEREUM_NETWORK) {
      return {
        imageName: 'EmptyWallet',
        text: 'Your Ethereum wallet is empty.'
      }
    } else {
      return {
        imageName: 'EmptyWallet',
        text:
          'Your wallet is empty.\nDeposit funds to start using the OMG Network.'
      }
    }
  }, [type])

  return (
    <View style={{ ...styles.container(theme), ...style }}>
      <View style={styles.header(theme)}>
        <OMGText style={styles.title(theme)} weight='regular'>
          TOKENS
        </OMGText>
        {updatedAt && (
          <>
            <OMGText style={styles.updatedAt(theme)}>
              Updated at: {updatedAt}
            </OMGText>
            <TouchableOpacity
              onPress={handleReload || false}
              style={styles.btnRefresh}>
              <FontAwesome5 name='redo' size={12} color={theme.colors.gray8} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.assetContainer(theme)}>
        {loading ? (
          <OMGEmpty loading={true} />
        ) : (
          <FlatList
            style={styles.assetList}
            data={data}
            refreshControl={refreshControl}
            keyExtractor={keyExtractor}
            ListEmptyComponent={
              <OMGEmpty {...getEmptyStatePayload()} style={styles.emptyState} />
            }
            contentContainerStyle={
              data && data.length
                ? styles.contentContainer
                : styles.emptyContentContainer
            }
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: theme => ({
    flexDirection: 'column',
    marginTop: -1,
    backgroundColor: theme.colors.black5,
    paddingHorizontal: Styles.getResponsiveSize(36, { small: 24, medium: 30 }),
    paddingBottom: 8
  }),
  contentContainer: {},
  emptyContentContainer: {
    flexGrow: 1
  },
  emptyState: {
    top: -12
  },
  header: theme => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.black5
  }),
  updatedAt: theme => ({
    color: theme.colors.gray2,
    letterSpacing: -0.4,
    fontSize: 10
  }),
  assetContainer: theme => ({
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.black5,
    paddingVertical: 16
  }),
  assetList: {},
  title: theme => ({
    flex: 1,
    textAlign: 'left',
    justifyContent: 'flex-start',
    color: theme.colors.white,
    fontSize: Styles.getResponsiveSize(14, { small: 10, medium: 12 })
  }),
  btnRefresh: {
    marginLeft: 8,
    padding: 10,
    backgroundColor: 'rgba(171,178,194, 0.2)',
    borderRadius: 16,
    alignItems: 'center'
  }
})

export default withTheme(OMGAssetList)
