class UserMutation extends Relay.Mutation {
  // This method should return a GraphQL operation that represents
  // the mutation to be performed. This presumes that the server
  // implements a mutation type named ‘likeStory’.
  // 该方法返回GraphQL的运行结果，代表着mutation的执行。前提是服务器端实现了一个名叫‘likeStory’的mutation type
  getMutation() {
    return Relay.QL`mutation {addUser}`;
  }
  // Use this method to prepare the variables that will be used as
  // input to the mutation. Our ‘likeStory’ mutation takes exactly
  // one variable as input – the ID of the story to like.
  // 该方法用返回一些变量，作为mutation的输入。这里的'likeStory' mutation只需要一个输入参数，就是要点赞的storey ID
  getVariables() {
    return {userID: this.props.user.id};
  }
  // Use this method to design a ‘fat query’ – one that represents every
  // field in your data model that could change as a result of this mutation.
  // 该方法定义一个'fat query'，用于表示你数据模型中每一个可能受该mutation变化影响的项
  // Liking a story could affect the likers count, the sentence that
  // summarizes who has liked a story, and the fact that the viewer likes the
  // story or not.
  // 对一个story点赞可能影响到点赞数、显示的句子和用户是否点赞的标示
  // Relay will intersect this query with a ‘tracked query’
  // that represents the data that your application actually uses, and
  // instruct the server to include only those fields in its response.
  // Relay会自动跟踪这些查询，恰当的选取查询的一部分，并且只向服务器请求刚好需要的数据。
  getFatQuery() {
    return Relay.QL`
      fragment on LikeStoryPayload {
        user {
          name
        },
      }
    `;
  }
  // These configurations advise Relay on how to handle the LikeStoryPayload
  // returned by the server. Here, we tell Relay to use the payload to
  // change the fields of a record it already has in the store. The
  // key-value pairs of ‘fieldIDs’ associate field names in the payload
  // with the ID of the record that we want updated.
  // 这个配置告诉Relay如何处理服务器返回的LikeStoryPayLoad。这里，我们告诉Relay用这个payload去修改一条已经存在于store中的记录。
  // 键值对中，键'fieldIDs'关联到playload中的field名字，通过ID确认是我们要更新的那条记录
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id,
      },
    }];
  }
  // This mutation has a hard dependency on the story's ID. We specify this
  // dependency declaratively here as a GraphQL query fragment. Relay will
  // use this fragment to ensure that the story's ID is available wherever
  // this mutation is used.
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        _id,
      }
    `,
  };
}
